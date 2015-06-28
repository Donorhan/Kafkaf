goog.provide('Kafkaf.GameScene');
goog.require('Kafkaf.AISystem');
goog.require('Kafkaf.GameSystem');
goog.require('Kafkaf.PhysicSystem');
goog.require('Kafkaf.RendererSystem');
goog.require('Kafkaf.CollisionListenerSystem');
goog.require('Kafkaf.ControllableSystem');
goog.require('Kafkaf.LifeSystem');
goog.require('Kafkaf.JumpSystem');
goog.require('Kafkaf.MoveSystem');
goog.require('Kafkaf.Event.UserEvent');
goog.require('Kafkaf.Models.Level');
goog.require('Kafkaf.Modes.GameMode');
goog.require('Core.Event');
goog.require('Core.Scene');

/**
* The game scene: The most interesting scene, trust me.
* @extends {Core.Scene}
* @constructor
*/
Kafkaf.GameScene = function()
{
    Core.Scene.call(this);

    /**
    * The world instance: entities/components and systems management.
    * @type {ES.World}
    * @private
    */
    this.world = new ES.World();

    /**
    * Level instance.
    * @type {Kafkaf.Models.Level}
    * @private
    */
    this.level = new Kafkaf.Models.Level(this.world);

    /**
    * A reference to the renderer system.
    * Useful to process graphic's part out of the logic one.
    * @type {Kafkaf.RendererSystem}
    * @private
    */
    this.rendererSystem = null;
}
goog.inherits(Kafkaf.GameScene, Core.Scene);

/**
* Call when scene goes to foreground.
*/
Kafkaf.GameScene.prototype.onActivation = function() 
{
    this.startNewGame("level_test.json", Kafkaf.Modes.GameMode.Mode.TheOne, 1);
};

/**
* Start a new game.
* @param {string} levelName Name of the level to load.
* @param {Kafkaf.Modes.GameMode.Mode} mode Mode.
* @param {number} playerCount Player count.
*/
Kafkaf.GameScene.prototype.startNewGame = function( levelName, mode, playerCount ) 
{
    // Set mode.
    var gameSystem = this.world.getSystem(Kafkaf.GameSystem);
    gameSystem.setMode(Kafkaf.Modes.GameMode.Mode.TheOne);

    // Load the level and ask to spawn players.
    var _this = this;
    this.loadLevel(levelName, function( success )
    {
        var playerSystem = _this.world.getSystem(Kafkaf.PlayerSystem);
        for( var i = 0; i < playerCount; i++ )
            playerSystem.createPlayer(_this.level.getEntityBuilder(), "player_" + i);
    });
}

/**
* Load a level from his name.
* @param {string} levelName Name of the level to load.
* @param {function} callback Function to execute when the level is ready.
*/
Kafkaf.GameScene.prototype.loadLevel = function( levelName, callback ) 
{
    // Load catalog of objects.
    var _this = this;
    this.level.getEntityBuilder().loadPrefabsFromFile("./assets/data/prefabs.json?" + Math.random(), function( success )
    {
        if( success )
        {
            // Load level.
            _this.level.loadFromFile("./assets/data/" + levelName + "?" + Math.random(), function( success )
            {
                callback(success);
            });
        }
    });
};

/**
* Call when scene must be loaded.
*/
Kafkaf.GameScene.prototype.onLoad = function()
{
    // Add systems.
    this.world.addSystem( new Kafkaf.AISystem() );
    this.world.addSystem( new Kafkaf.RendererSystem("application") );
    this.world.addSystem( new Kafkaf.PhysicSystem() );
    this.world.addSystem( new Kafkaf.CollisionListenerSystem() );
    this.world.addSystem( new Kafkaf.ControllableSystem() );
    this.world.addSystem( new Kafkaf.GameSystem() );
    this.world.addSystem( new Kafkaf.LifeSystem() );
    this.world.addSystem( new Kafkaf.JumpSystem() );
    this.world.addSystem( new Kafkaf.MoveSystem() );
    this.world.addSystem( new Kafkaf.PlayerSystem() );

    // Links.
    this.rendererSystem             = this.world.getSystem(Kafkaf.RendererSystem);
    var physicSystem                = this.world.getSystem(Kafkaf.PhysicSystem);
    var collisionListenerSystem     = this.world.getSystem(Kafkaf.CollisionListenerSystem);
    physicSystem.physicWorld.SetContactListener(collisionListenerSystem.getContactListener());

    // Link collision solvers to the right system.
    addCollisionSolvers(collisionListenerSystem);

    // Init.
    this.level.init();

    // Debug physic.
    {
        var graphicDebugObject = physicSystem.activateDebug();
        this.rendererSystem.scene.addChild(graphicDebugObject);
    }
};

/**
* Call when scene must be unload.
*/
Kafkaf.GameScene.prototype.onUnload = function()
{
    this.world.clear();
};

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.GameScene.prototype.update = function( deltaTime )
{
    this.world.update(deltaTime);
};

/**
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.GameScene.prototype.render = function( deltaTime )
{
    this.rendererSystem.update(deltaTime);
};

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Kafkaf.GameScene.prototype.onEvent = function( event )
{
    this.world.sendEvent( new Kafkaf.Event.UserEvent(event) );
};

/**
* Get the world instance.
* @return {ES.World} An ES.World instance. 
*/
Kafkaf.GameScene.prototype.getWorld = function()
{
    return this.world;
};
