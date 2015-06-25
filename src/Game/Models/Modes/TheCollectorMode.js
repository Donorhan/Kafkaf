goog.provide('Kafkaf.Modes.TheCollectorMode');
goog.require('Kafkaf.Modes.GameMode');

/**
* The Survivor.
* Rule: Get all the objects you can in a given time period.
* @param {ES.World} world World instance to work with.
* @constructor
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
* @param {Core.Event} event An Event instance. 
*/
Kafkaf.Modes.TheCollectorMode.prototype.onEvent = function( event )
{

};
