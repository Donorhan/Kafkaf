goog.provide('Kafkaf.Event.UserEvent');

/**
* Convert a Core.Event to an Event for the systems.
*
* @param {Core.Event} event An Event instance.
* @extends ES.Event
* @constructor
*/
Kafkaf.Event.UserEvent = function( event )
{
    /**
    * The core event instance.
    * @type {Core.Event}
    */
    this.event = event;
}
ES.Utils.extend(ES.Event, Kafkaf.Event.UserEvent);