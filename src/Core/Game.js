goog.provide('Core.Game');
goog.require('Core.SceneManager');

/**
* Entry point of a game.
* @constructor
* @interface
*/
Core.Game = function() 
{	
    /**
    * The scene manager.
    * @type {Core.SceneManager}
    * @protected
    */
    this.sceneManager = new Core.SceneManager();
}

/**
* Init.
* @return {boolean} True if everything is ok.
*/
Core.Game.prototype.init = function() { return true; };

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Game.prototype.update = function( deltaTime ) 
{
    this.sceneManager.update(deltaTime);
};

/**
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Game.prototype.render = function( deltaTime )
{
    this.sceneManager.render(deltaTime);
};

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Core.Game.prototype.onEvent = function( event ) 
{
    if( this.sceneManager.activeScene )
        this.sceneManager.activeScene.onEvent(event);
};

/**
* Get the scene manager.
* @return {Core.SceneManager} The SceneManager instance. 
*/
Core.Game.prototype.getSceneManager = function() 
{
    return this.sceneManager;
};
