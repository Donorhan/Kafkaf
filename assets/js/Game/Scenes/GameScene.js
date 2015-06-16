'use strict';

/**
* The game scene: The most interesting.
* @constructor
*/
Kafkaf.GameScene = function()
{
    this.entityManager = new Core.EntityManager();
}

/**
* Call when scene goes to foreground.
*/
Kafkaf.GameScene.prototype.onActivation = function() 
{

};

/**
* Call when scene goes to background.
*/
Kafkaf.GameScene.prototype.onInactivation = function()
{

};

/**
* Call when scene must be loaded.
*/
Kafkaf.GameScene.prototype.onLoad = function()
{

};

/**
* Call when scene must be unload.
*/
Kafkaf.GameScene.prototype.onUnload = function()
{

};

/**
* Entry point.
* @param deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.GameScene.prototype.update = function( deltaTime )
{
    this.entityManager.update(deltaTime);
};