goog.provide('Kafkaf.Event.DeadEvent');

/**
* An event to indicate when an entity died.
* @param {ES.Entity} victim The victim.
* @extends ES.Event
* @constructor
*/
Kafkaf.Event.DeadEvent = function( victim )
{
    /**
    * An entity instance.
    * @type {ES.Entity}
    */
    this.victim = victim;

}
ES.Utils.extend(ES.Event, Kafkaf.Event.DeadEvent);
