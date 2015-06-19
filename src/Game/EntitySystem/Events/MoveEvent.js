goog.provide('Kafkaf.Event.MoveEvent');

/**
* An event to indicate when an entity want to move.
* @param {ES.Entity} entity The target.
* @param {number} normal Normal representing movement's direction.
* @extends ES.Event
* @constructor
*/
Kafkaf.Event.MoveEvent = function( entity, normal )
{
    /**
    * An entity instance.
    * @type {ES.Entity}
    */
    this.entity = entity;

    /**
    * Movement's normal: We are working in a 1D plan (2D game/horizontal axis only) so one value suffice.
    * @type {number}
    */
    this.normal = normal || 0;
}
ES.Utils.extend(ES.Event, Kafkaf.Event.MoveEvent);