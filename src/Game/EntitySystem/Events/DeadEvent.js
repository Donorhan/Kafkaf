goog.provide('Kafkaf.Event.DeadEvent');
goog.require('ES.Event');
goog.require('ES.Utils');

/**
* An event to indicate when an entity died.
* @param {ES.Entity} victim The victim.
* @param {ES.Entity} killer The killer.
* @extends ES.Event
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
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
