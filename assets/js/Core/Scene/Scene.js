'use strict';

/**
* Manage Scene instances.
* @constructor
*/
Core.Scene = function()
{
    this.entityManager = new Core.EntityManager();
}

/**
* Call when scene goes to foreground.
*/
Core.Scene.prototype.onActivation = function() { };

/**
* Call when scene goes to background.
*/
Core.Scene.prototype.onInactivation = function() { };

/**
* Call when scene must be loaded.
*/
Core.Scene.prototype.onLoad = function() { };

/**
* Call when scene must be unload.
*/
Core.Scene.prototype.onUnload = function() { };

/**
* Entry point.
* @param deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Scene.prototype.update = function( deltaTime )
{
    this.entityManager.update(deltaTime);
};