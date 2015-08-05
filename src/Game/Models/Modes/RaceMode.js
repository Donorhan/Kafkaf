goog.provide('Kafkaf.Modes.RaceMode');
goog.require('Kafkaf.Modes.GameMode');

/**
* The Survivor.
* Rule: The first to be at the finish line win.
* @constructor
* @extends {Kafkaf.Modes.GameMode}
* @param {ES.World} world World instance to work with.
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Modes.RaceMode = function( world )
{
    Kafkaf.Modes.GameMode.call(this, world);
}
goog.inherits(Kafkaf.Modes.RaceMode, Kafkaf.Modes.GameMode);

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.RaceMode.prototype.update = function( deltaTime )
{

};

/**
* Call when an event pop.
* @param {ES.Event} event An Event instance.
*/
Kafkaf.Modes.RaceMode.prototype.onEvent = function( event )
{

};
