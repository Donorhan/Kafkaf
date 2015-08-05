goog.provide('Kafkaf.SpriteComponent');
goog.require('ES.Utils');

/**
* Add a sprite to an entity.
* @param {PIXI.Sprite} instance A PIXI.Sprite instance.
* @extends {ES.Component}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.SpriteComponent = function( instance )
{
    ES.Component.call(this);

    /**
    * PIXI's instance.
    * @type {PIXI.Sprite}
    */
    this.instance = instance;
}
ES.Utils.extend(ES.Component, Kafkaf.SpriteComponent);
