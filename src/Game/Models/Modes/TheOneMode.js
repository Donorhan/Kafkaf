goog.provide('Kafkaf.Modes.TheOneMode');
goog.require('Kafkaf.Modes.GameMode');
goog.require('Kafkaf.Event.DeadEvent');

/**
* The Survivor.
* Rule: Kill the others players to win the game.
* @param {ES.World} world World instance to work with.
* @constructor
*/
Kafkaf.Modes.TheOneMode = function( world )
{
    Kafkaf.Modes.GameMode.call(this, world);
}
goog.inherits(Kafkaf.Modes.TheOneMode, Kafkaf.Modes.GameMode);

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.TheOneMode.prototype.update = function( deltaTime )
{

};

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Kafkaf.Modes.TheOneMode.prototype.onEvent = function( event )
{
    if( event instanceof Kafkaf.Event.DeadEvent )
    {
    	this.world.destroyEntity(event.victim);
    }
};
