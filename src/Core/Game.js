goog.provide('Core.Game');

/**
* Entry point of a game.
* @constructor
* @interface
*/
Core.Game = function() {}

/**
* Init.
* @return {boolean} True if everything is ok.
*/
Core.Game.prototype.init = function() { return true; };

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Game.prototype.update = function( deltaTime ) { };

/**
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Game.prototype.render = function( deltaTime ) { };

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Core.Game.prototype.onEvent = function( event ) { };