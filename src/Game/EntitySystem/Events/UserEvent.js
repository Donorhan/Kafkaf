goog.provide('Kafkaf.UserEvent');

/**
* Convert a Core.Event to an Event for the systems.
*
* @param {Core.Event} event An Event instance.
* @augments ES.Event
* @constructor
*/
Kafkaf.UserEvent = function( event )
{
    /**
    * The core event instance.
    * @type {Core.Event}
    */
    this.event = event;
}
ES.Utils.extend(ES.Event, Kafkaf.UserEvent);