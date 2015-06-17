goog.provide('Kafkaf.Game');
goog.require('Kafkaf.GameScene');
goog.require('Core.Game');
goog.require('Core.SceneManager');

/**
* Manage game's logic.
* @constructor
*/
Kafkaf.Game = function()
{
    /**
    * The scene manager.
    * @type {Core.SceneManager}
    * @private
    */
    this.sceneManager = new Core.SceneManager();
}
goog.inherits(Kafkaf.Game, Core.Game);

/**
* Init.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Game.prototype.init = function()
{
    // Push default scene.
    this.sceneManager.pushScene( new Kafkaf.GameScene() );

    return true;
};

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Game.prototype.update = function( deltaTime )
{
    this.sceneManager.update(deltaTime);
};

/**
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Game.prototype.render = function( deltaTime )
{
    this.sceneManager.render(deltaTime);
};

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Kafkaf.Game.prototype.onEvent = function( event )
{
    if( this.sceneManager.activeScene )
        this.sceneManager.activeScene.onEvent(event);
};