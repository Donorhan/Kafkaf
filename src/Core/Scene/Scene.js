goog.provide('Core.Scene');

/**
* A Scene.
* @interface
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Core.Scene = function() { };

/**
* Call when scene goes to the foreground.
*/
Core.Scene.prototype.onActivation = function() { };

/**
* Call when scene goes to the background.
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
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Core.Scene.prototype.onEvent = function( event ) { };

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Scene.prototype.update = function( deltaTime ) { };

/**
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Scene.prototype.render = function( deltaTime ) { };