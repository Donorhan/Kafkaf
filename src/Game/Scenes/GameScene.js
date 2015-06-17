goog.provide('Kafkaf.GameScene');
goog.require('Kafkaf.GameSystem');
goog.require('Kafkaf.PhysicSystem');
goog.require('Kafkaf.RendererSystem');
goog.require('Kafkaf.UserEvent');
goog.require('Kafkaf.Helpers.LevelLoader');
goog.require('Core.Event');
goog.require('Core.Scene');

/**
* The game scene: The most interesting scene, trust me.
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
    this.rendererSystem = new Kafkaf.RendererSystem("application");
    this.world.addSystem(this.rendererSystem);
    this.world.addSystem( new Kafkaf.PhysicSystem() );
    this.world.addSystem( new Kafkaf.GameSystem() );

    // Init.
    this.levelLoader.init();
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
    this.world.sendEvent(new Kafkaf.UserEvent(event));
};