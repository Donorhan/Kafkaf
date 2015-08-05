goog.provide('Kafkaf.Modes.TheCollectorMode');
goog.require('Kafkaf.Modes.GameMode');

/**
* The Survivor.
* Rule: Get all the objects you can in a given time.
* @constructor
* @extends {Kafkaf.Modes.GameMode}
* @param {ES.World} world World instance to work with.
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Modes.TheCollectorMode = function( world )
{
    Kafkaf.Modes.GameMode.call(this, world);
}
goog.inherits(Kafkaf.Modes.TheCollectorMode, Kafkaf.Modes.GameMode);

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.TheCollectorMode.prototype.update = function( deltaTime )
{

};

/**
* Call when an event pop.
* @param {ES.Event} event An Event instance.
*/
Kafkaf.Modes.TheCollectorMode.prototype.onEvent = function( event )
{

};
