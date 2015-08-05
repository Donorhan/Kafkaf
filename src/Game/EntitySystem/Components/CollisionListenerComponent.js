goog.provide('Kafkaf.CollisionListenerComponent');
goog.provide('Kafkaf.CollisionData');
goog.require('ES.Utils');

/**
* Allow entities to listen physic collisions and get some informations about them.
* @extends {ES.Component}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.CollisionListenerComponent = function()
{
    ES.Component.call(this);

    /**
    * Callbacks names.
    * @type {Array.<function(Kafkaf.CollisionData)>}
    */
    this.callbacks = [];
}
ES.Utils.extend(ES.Component, Kafkaf.CollisionListenerComponent);

/**
* Types of collision.
* @enum {number}
*/
Kafkaf.CollisionListenerComponent.Type = { Begin: 0, End: 1, PreSolve: 2, PostSolve: 3 };

/**
* Collision data.
* @constructor
*/
Kafkaf.CollisionData = function()
{
    /**
    * Entity A in collision.
    * @type {ES.Entity}
    */
    this.entityA = null;

    /**
    * Entity B in collision.
    * @type {ES.Entity}
    */
    this.entityB = null;

    /**
    * Body's fixture in contact from the entity A.
    * @type {b2Fixture}
    */
    this.fixtureA = null;

    /**
    * Body's fixture in contact from the entity B.
    * @type {b2Fixture}
    */
    this.fixtureB = null;

    /**
    * An array with normal's data for each axis.
    * @type {Array.<number>}
    */
    this.normal = [];
}