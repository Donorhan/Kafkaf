goog.provide('Kafkaf.Loaders.TransformLoader');

/**
* Convert transform data to a TransformComponent.
* @constructor
*/
Kafkaf.Loaders.TransformLoader = function() 
{

}

/**
* Create a SpriteComponent from JSON data (using PIXI.js).
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {string} data A String using JSON format.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Loaders.TransformLoader.prototype.loadFromData = function( entity, data )
{
    return true;
};