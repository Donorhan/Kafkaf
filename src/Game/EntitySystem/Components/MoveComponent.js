goog.provide('Kafkaf.MoveComponent');
goog.require('ES.Utils');

/**
* Allow an entity to move.
* @param {number=} speed Movements speed.
* @extends {ES.Component}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.MoveComponent = function( speed )
{
    ES.Component.call(this);

    /**
    * Maximum speed allowed.
    * @type {number}
    */
    this.maxSpeed = 10.0;

    /**
    * Entity's speed.
    * @type {number}
    */
    this.speed = speed || 10.0;

    /**
    * Acceleration scale.
    * @type {number}
    */
    this.accelerationScale = 0.7;

    /**
    * Deceleration scale.
    * @type {number}
    */
    this.decelerationScale = 0.90;

    /**
    * Air resistance scale.
    * @type {number}
    */
    this.airResistanceScale = 0.995;

    /**
    * Movement's normal: We are working in a 1D plan (2D game/horizontal axis only) so one value suffice.
    * @type {number}
    */
    this.normal = 0;
}
ES.Utils.extend(ES.Component, Kafkaf.MoveComponent);