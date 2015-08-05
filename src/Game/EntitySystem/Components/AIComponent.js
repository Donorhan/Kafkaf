goog.provide('Kafkaf.AIComponent');
goog.require('ES.Component');
goog.require('ES.Utils');

/**
* Add AI to an entity.
* @extends {ES.Component}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.AIComponent = function()
{
    ES.Component.call(this);

    /**
    * Type of AI: A value representing all actions the AI can do.
    * You need to do a logic operation between type to allow multiple actions.
    * @type {Array.<Object>}
    */
    this.behaviors = [];
}
ES.Utils.extend(ES.Component, Kafkaf.AIComponent);

/**
* Types of A.I.
* @enum {number}
*/
Kafkaf.AIComponent.Type = { Unknow: 0, AutomaticRotation: 1, AvoidWalls: 2, AttackNearEntity: 4, AutoExplode: 8 };

/**
* Add a behavior to the component.
* @param {Kafkaf.AIComponent.Type} type A type of behavior.
* @param {number} value A value linked.
*/
Kafkaf.AIComponent.prototype.addBehavior = function( type, value )
{
    this.behaviors.push({type: type, value: value});
};
