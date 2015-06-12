'use strict';

/**
* Create a graphic element from data.
* @constructor
*/
Kafkaf.GraphicLoader = function()
{

}

/**
* Compute graphic instance (PIXI) from JSON data.
* @param entity An Entity instance to fill with data.
* @param data A String using JSON format.
* @return True if everything is ok.
*/
Kafkaf.GraphicLoader.loadFromData = function( entity, data )
{
    var texture         = PIXI.Texture.fromImage(data.textureName);
    var instance        = new PIXI.Sprite(texture);

    // Set from center.
    instance.anchor.x = 0.5;
    instance.anchor.y = 0.5;

    // Save PIXI instance.
    entity.graphicComponent = instance;

    return true;
};