goog.provide('Kafkaf.GameSystem');
goog.require('Kafkaf.Event.DeadEvent');

/**
* Game system: Manage game's logic.
* @extends {ES.System}
* @constructor
*/
Kafkaf.GameSystem = function()
{
    ES.System.call(this);
}
ES.Utils.extend(ES.System, Kafkaf.GameSystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.GameSystem.prototype.update = function( deltaTime )
{
    
};

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.GameSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.DeadEvent )
    {
    	this.world.destroyEntity(event.victim);
    }
};