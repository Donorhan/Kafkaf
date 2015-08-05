goog.provide('Kafkaf.TransformComponent');
goog.require('ES.Utils');

/**
* Add basic mathematical attributs.
* @extends {ES.Component}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.TransformComponent = function()
{
    ES.Component.call(this);

    /**
    * Position.
    * @type {{ x: number, y: number }}
    */
    this.position = { x : 0, y : 0 };

    /**
    * Scale.
    * @type {{ x: number, y: number }}
    */
    this.scale = { x : 1, y : 1 };

    /**
    * Rotation.
    * @type {number}
    */
    this.rotation = 0;
}
ES.Utils.extend(ES.Component, Kafkaf.TransformComponent);