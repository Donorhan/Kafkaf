goog.provide('Kafkaf.Event.DamageEvent');

/**
* An event to indicate than an entity tool some damage.
* @param {ES.Entity} victim The victim.
* @param {ES.Entity} entity The agressor.
* @extends ES.Event
* @constructor
*/
Kafkaf.Event.DamageEvent = function( victim, agressor )
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
    this.agressor = agressor;

}
ES.Utils.extend(ES.Event, Kafkaf.Event.DamageEvent);