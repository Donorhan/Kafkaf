goog.provide('Kafkaf.JumpComponent');

/**
* Allow an entity to jump.
* @param {=number} force Jump's force to apply.
* @param {=number} max Jump max allowed in the air.
* @extends {ES.Component}
* @constructor
*/
Kafkaf.JumpComponent = function( force, max )
{
    ES.Component.call(this);

    /**
    * Define jump's height.
    * @type {number}
    */
    this.force = force || 10.0;

    /**
    * Maximum jump allowed in the air.
    * @type {number}
    */
    this.max = max || 1;

    /**
    * Jump counter, his value is 0 when player is on the floor.
    * @type {number}
    */
    this.count = 0;

}
ES.Utils.extend(ES.Component, Kafkaf.JumpComponent);