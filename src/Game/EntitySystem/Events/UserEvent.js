goog.provide('Kafkaf.Event.UserEvent');
goog.require('ES.Event');
goog.require('ES.Utils');

/**
* Convert a Core.Event to an Event for the systems.
*
* @param {Core.Event} event An Event instance.
* @extends {ES.Event}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
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