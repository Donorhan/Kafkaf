'use strict';

/**
* Manage game's logic.
* @constructor
*/
Core.Game = function() {}

/**
* Init.
* @return True if everything is ok.
*/
Core.Game.prototype.init = function() { return true; };

/**
* Entry point.
* @param deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Game.prototype.update = function( deltaTime ) { };

/**
* Call on an event.
* @param event An Event instance. 
*/
Core.Game.prototype.onEvent = function( event ) { };