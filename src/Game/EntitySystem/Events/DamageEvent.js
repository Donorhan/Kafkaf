goog.provide('Kafkaf.Event.DamageEvent');

/**
* An event to indicate when an entity took some damages.
* @param {ES.Entity} victim The victim.
* @param {ES.Entity} agressor The agressor.
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
