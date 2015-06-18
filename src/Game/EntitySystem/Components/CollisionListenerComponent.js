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
    * Name of the callback to execute when a contact begin.
    * @type {string}
    */
    this.beginCallbackName = "";

    /**
    * Name of the callback to execute when a contact end.
    * @type {string}
    */
    this.endCallbackName = "";

    /**
    * Name of the callback to execute during presolve contact part.
    * @type {string}
    */
    this.presolveCallbackName = "";

    /**
    * Name of the callback to execute during presolve contact part.
    * @type {string}
    */
    this.postsolveCallbackName = "";

}
ES.Utils.extend(ES.Component, Kafkaf.CollisionListenerComponent);

/**
* Add a sprite to an entity.
* @param {PIXI.Sprite} instance A PIXI.Sprite instance.
* @extends {ES.Component}
* @constructor
*/
Kafkaf.CollisionData = function()
{
    ES.Component.call(this);

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
    * @type {Object}
    */
    this.fixtureA = null;

    /**
    * Body's fixture in contact from the entity B.
    * @type {Object}
    */
    this.fixtureB = null;

    /**
    * Indicate if fixture A is a sensor.
    * @type {boolean}
    */
    this.isFixtureASensor = false;

    /**
    * Indicate if fixture B is a sensor.
    * @type {boolean}
    */
    this.isFixtureBSensor = false;

    /**
    * Array with all the contacts during the collision.
    * @type {Array.<Object>}
    */
    this.contacts = [];

    /**
    * An array with normal's data for each axis.
    * @type {Array.<number>}
    */
    this.normal = [];

}
ES.Utils.extend(ES.Component, Kafkaf.CollisionData);
