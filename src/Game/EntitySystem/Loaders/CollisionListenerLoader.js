goog.provide('Kafkaf.Loaders.CollisionListenerLoader');
goog.require('Kafkaf.CollisionListenerComponent');

/**
* Convert CollisionListenerComponent JSON to a CollisionListenerComponent.
* @constructor
*/
Kafkaf.Loaders.CollisionListenerLoader = function() { }

/**
* Create a CollisionListenerComponent from JSON data.
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {string} data A String using JSON format.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Loaders.CollisionListenerLoader.prototype.loadFromData = function( entity, data )
{
    var component   = new Kafkaf.CollisionListenerComponent();
    component[0]    = data.begin        || "";
    component[1]    = data.end          || "";
    component[2]    = data.presolve     || "";
    component[3]    = data.postsolve    || "";
    entity.addComponent(component);

    return true;
};