goog.provide('Kafkaf.CollisionListenerComponent');
goog.provide('Kafkaf.CollisionData');

/**
* Allow entities to listen physic collisions and get some informations about them.
* @extends {ES.Component}
* @constructor
*/
Kafkaf.CollisionListenerComponent = function()
{
    ES.Component.call(this);

    /**
    * Callbacks names.
    * @type {Array.<string>}
    */
    this.callbacks = [];

}
ES.Utils.extend(ES.Component, Kafkaf.CollisionListenerComponent);

/**
* Types of collision.
* @enum {number}
*/
Kafkaf.CollisionListenerComponent.Type = { Begin: 0, End: 1, PreSolve: 2, PostSolve: 3 };
