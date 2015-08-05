goog.provide('Kafkaf.Modes.TheSurvivorMode');
goog.require('Kafkaf.Modes.GameMode');

/**
* The Survivor.
* Rule: The last player alive win the game.
* @constructor
* @extends {Kafkaf.Modes.GameMode}
* @param {ES.World} world World instance to work with.
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Modes.TheSurvivorMode = function( world )
{
    Kafkaf.Modes.GameMode.call(this, world);
}
goog.inherits(Kafkaf.Modes.TheSurvivorMode, Kafkaf.Modes.GameMode);

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.TheSurvivorMode.prototype.update = function( deltaTime )
{

};

/**
* Call when an event pop.
* @param {ES.Event} event An Event instance.
*/
Kafkaf.Modes.TheSurvivorMode.prototype.onEvent = function( event )
{

};
