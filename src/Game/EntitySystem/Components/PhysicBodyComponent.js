goog.provide('Kafkaf.PhysicBodyComponent');

/**
* Add a physic body to an entity.
* @param {b2Body} instance A Box2D body instance.
* @extends {ES.Component}
* @constructor
*/
Kafkaf.PhysicBodyComponent = function( instance )
{
    ES.Component.call(this);

    /**
    * Box2D's instance.
    * @type {b2Body}
    */
    this.instance = instance;
}
ES.Utils.extend(ES.Component, Kafkaf.PhysicBodyComponent);

/**
* Types of physic body.
* @enum {number}
*/
Kafkaf.PhysicBodyComponent.BodyType = { Static: 0, Dynamic: 1, Kinematic: 2 };

/**
* Types of shape.
* @enum {number}
*/
Kafkaf.PhysicBodyComponent.ShapeType = { Circle: 0, Box: 1, Polygon: 2 };