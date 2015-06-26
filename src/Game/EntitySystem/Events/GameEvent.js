goog.provide('Kafkaf.Event.GameEvent');

/**
* An event to indicate a game event (someone win, everyone is dead, …)
* @param {Kafkaf.Event.GameEvent.Type} type Type of GameEvent.
* @extends ES.Event
* @constructor
*/
Kafkaf.Event.GameEvent = function( type )
{
    /**
    * Type.
    * @type {Kafkaf.Event.GameEvent.Type}
    */
    this.type = type;

}
ES.Utils.extend(ES.Event, Kafkaf.Event.GameEvent);

/**
* Types of GameEvent.
* @enum {number}
*/
Kafkaf.Event.GameEvent.Type = { GameOver: 0 };