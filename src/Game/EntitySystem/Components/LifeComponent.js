goog.provide('Kafkaf.LifeComponent');
goog.require('ES.Utils');

/**
* Add life to an entity: The entity can die with this component.
* @param {number} amount Amount of life.
* @extends {ES.Component}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.LifeComponent = function( amount )
{
    ES.Component.call(this);

    /**
    * Amount of life.
    * @type {number}
    */
    this.amount = amount;
}
ES.Utils.extend(ES.Component, Kafkaf.LifeComponent);