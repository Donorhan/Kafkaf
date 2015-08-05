goog.provide('Kafkaf.Event.JumpEvent');
goog.require('ES.Event');
goog.require('ES.Utils');

/**
* An event to indicate when an entity want to jump.
* @param {Kafkaf.Event.JumpEvent.Type} type Type of JumpEvent.
* @param {ES.Entity} entity The target.
* @extends {ES.Event}
* @constructor
*/
Kafkaf.Event.JumpEvent = function( type, entity )
{
    /**
    * An entity instance.
    * @type {ES.Entity}
    */
    this.entity = entity;

    /**
    * Type.
    * @type {Kafkaf.Event.JumpEvent.Type}
    */
    this.type = type;
}
ES.Utils.extend(ES.Event, Kafkaf.Event.JumpEvent);

/**
* Types of JumpEvent.
* @enum {number}
*/
Kafkaf.Event.JumpEvent.Type = { AskToJump: 0, ResetCounter: 1 };