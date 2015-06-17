goog.provide('Kafkaf.SpriteComponent');

/**
* Add a sprite to an entity.
* @param {PIXI.Sprite} instance A PIXI.Sprite instance.
* @extends {ES.Component}
* @constructor
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
