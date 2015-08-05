goog.provide('Kafkaf.Loaders.SpriteLoader');
goog.require('Kafkaf.SpriteComponent');

/**
* Convert SpriteComponent JSON to a SpriteComponent.
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Loaders.SpriteLoader = function() { };

/**
* Create a SpriteComponent from JSON data (using PIXI.js).
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {Object} data A String using JSON format.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Loaders.SpriteLoader.prototype.loadFromData = function( entity, data )
{
    var texture     = PIXI.Texture.fromImage(data.texture);
    var instance    = new PIXI.Sprite(texture);

    // Set from center.
    instance.anchor.x = 0.5;
    instance.anchor.y = 0.5;

    // Create the component now.
    entity.addComponent( new Kafkaf.SpriteComponent(instance) );

    return true;
};