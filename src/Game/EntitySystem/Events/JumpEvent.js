goog.provide('Kafkaf.Event.JumpEvent');

/**
* An event to indicate when an entity want to jump.
* @param {ES.Entity} entity The target.
* @extends ES.Event
* @constructor
*/
Kafkaf.Event.JumpEvent = function( entity )
{
    /**
    * An entity instance.
    * @type {ES.Entity}
    */
    this.entity = entity;

}
ES.Utils.extend(ES.Event, Kafkaf.Event.JumpEvent);