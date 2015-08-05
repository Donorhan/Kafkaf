goog.provide('Kafkaf.JumpComponent');
goog.require('ES.Utils');

/**
* Allow an entity to jump.
* @param {number=} force Jump's force to apply.
* @param {number=} max Jump max allowed in the air.
* @extends {ES.Component}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
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

    /**
    * Counter used to stop "jump spam".
    * @type {number}
    * @see timeBetweenJump
    */
    this.jumpTimeOut = 0;

    /**
    * Time to wait between two jumps (in milliseconds).
    * @type {number}
    */
    this.timeBetweenJump = 250;
}
ES.Utils.extend(ES.Component, Kafkaf.JumpComponent);