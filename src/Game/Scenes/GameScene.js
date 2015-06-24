goog.provide('Kafkaf.GameScene');
goog.require('Kafkaf.GameSystem');
goog.require('Kafkaf.PhysicSystem');
goog.require('Kafkaf.RendererSystem');
goog.require('Kafkaf.CollisionListenerSystem');
goog.require('Kafkaf.ControllableSystem');
goog.require('Kafkaf.JumpSystem');
goog.require('Kafkaf.MoveSystem');
goog.require('Kafkaf.Event.UserEvent');
goog.require('Kafkaf.Helpers.LevelLoader');
goog.require('Core.Event');
goog.require('Core.Scene');

/**
* The game scene: The most interesting scene, trust me.
* @extends {Core.Scene}
* @constructor
*/
Kafkaf.GameScene = function()
{
    /**
    * The world instance: entities/components and systems management.
    * @type {ES.World}
    * @private
    */
    this.world = new ES.World();

    /**
    * Load levels and manage prefabs.
    * @type {Kafkaf.Helpers.LevelLoader}
    * @private
    */
    this.levelLoader = new Kafkaf.Helpers.LevelLoader(this.world);

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
    var loaderManager = this.levelLoader.getEntityBuilder();

    // Load catalog of objects.
    var _this = this;
    loaderManager.loadPrefabsFromFile("./assets/data/prefabs.json?" + Math.random(), function( success )
    {
        if( success )
        {
            // Load level.
            _this.levelLoader.loadFromFile("./assets/data/level_test.json?" + Math.random(), function( success )
            {
                // Temp: Add a controllable component here.
                var player = _this.world.getEntityWithName("Player");
                if( player )
                {
                    var controllableComponent = new Kafkaf.ControllableComponent();
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Up,      90 );
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Down,    83 );
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Left,    81 );
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Right,   68 );
                    player.addComponent( controllableComponent );
                    player.addComponent( new Kafkaf.MoveComponent() );
                    player.addComponent( new Kafkaf.JumpComponent( 10, 2 ) );

                    var collisionListener = new Kafkaf.CollisionListenerComponent();
                    collisionListener[0] = "characterBegin";
                    collisionListener[1] = "characterEnd";
                    player.addComponent(collisionListener);
                }

                // Temp: Add a controllable component here.
                var player2 = _this.world.getEntityWithName("Player2");
                if( player2 )
                {
                    var controllableComponent = new Kafkaf.ControllableComponent();
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Up,      38 );
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Down,    40 );
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Left,    37 );
                    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Right,   39 );
                    player2.addComponent( controllableComponent );
                    player2.addComponent( new Kafkaf.MoveComponent() );
                    player2.addComponent( new Kafkaf.JumpComponent( 10, 2 ) );

                    var collisionListener = new Kafkaf.CollisionListenerComponent();
                    collisionListener[0] = "characterBegin";
                    collisionListener[1] = "characterEnd";
                    player2.addComponent(collisionListener);
                }
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
    this.world.addSystem( new Kafkaf.RendererSystem("application") );
    this.world.addSystem( new Kafkaf.PhysicSystem() );
    this.world.addSystem( new Kafkaf.CollisionListenerSystem() );
    this.world.addSystem( new Kafkaf.ControllableSystem() );
    this.world.addSystem( new Kafkaf.GameSystem() );
    this.world.addSystem( new Kafkaf.JumpSystem() );
    this.world.addSystem( new Kafkaf.MoveSystem() );

    // Links.
    this.rendererSystem             = this.world.getSystem(Kafkaf.RendererSystem);
    var physicSystem                = this.world.getSystem(Kafkaf.PhysicSystem);
    var collisionListenerSystem     = this.world.getSystem(Kafkaf.CollisionListenerSystem);
    physicSystem.physicWorld.SetContactListener(collisionListenerSystem.getContactListener());

    // Link collision solvers to the right system.
    addCollisionSolvers(collisionListenerSystem);

    // Init.
    this.levelLoader.init();

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
