goog.provide('Kafkaf.Event.DeadEvent');

/**
* An event to indicate when an entity died.
* @param {ES.Entity} victim The victim.
* @param {ES.Entity} killer The killer.
* @extends ES.Event
* @constructor
*/
Kafkaf.Event.DeadEvent = function( victim, killer )
{
    /**
    * An entity instance.
    * @type {ES.Entity}
    */
    this.victim = victim;

    /**
    * An entity instance.
    * @type {ES.Entity}
    */
    this.killer = killer;

}
ES.Utils.extend(ES.Event, Kafkaf.Event.DeadEvent);
