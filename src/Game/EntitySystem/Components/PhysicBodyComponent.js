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

/**
* Enable/Disable the body.
* @param {boolean} value True to enable, false to disable.
*/
Kafkaf.PhysicBodyComponent.prototype.setActive = function( value )
{
    this.instance.SetActive(value);
};

/**
* Set body as a bullet.
* @param {boolean} value True to set as a bullet, otherwise false.
*/
Kafkaf.PhysicBodyComponent.prototype.setAsBullet = function( value )
{
    this.instance.SetBullet(value);
};

/**
* Enable/Disable body's rotation.
* @param {boolean} value True to ignore rotation, otherwise false.
*/
Kafkaf.PhysicBodyComponent.prototype.setFixedRotation = function( value )
{
    this.instance.SetFixedRotation(value);
};

/**
* Set type.
* @param {Kafkaf.PhysicBodyComponent.BodyType} type Type to assign.
*/
Kafkaf.PhysicBodyComponent.prototype.setType = function( type )
{
    if( type == Kafkaf.PhysicBodyComponent.BodyType.Static )
        this.instance.SetType(b2_staticBody);
    else if( type == Kafkaf.PhysicBodyComponent.BodyType.Dynamic )
        this.instance.SetType(b2_dynamicBody);
    else
        this.instance.SetType(b2_kinematicBody);        
};

/**
* Set body's gravity scale.
* @param {number} scale A floating value.
*/
Kafkaf.PhysicBodyComponent.prototype.setGravityScale = function( scale )
{
    this.instance.SetGravityScale(scale);
};

/**
* Set body's angular dumping.
* @param {number} value A floating value.
*/
Kafkaf.PhysicBodyComponent.prototype.setAngularDamping = function( value )
{
    this.instance.SetAwake(true);
    this.instance.SetAngularDamping(value);
};

/**
* Set body's angular velocity.
* @param {number} value A floating value.
*/
Kafkaf.PhysicBodyComponent.prototype.setAngularVelocity = function( value )
{
    this.instance.SetAwake(true);
    this.instance.SetAngularVelocity(value);
};

/**
* Set body's linear damping.
* @param {number} value A floating value.
*/
Kafkaf.PhysicBodyComponent.prototype.setLinearDamping = function( value )
{
    this.instance.SetAwake(true);
    this.instance.SetLinearDamping(value);
};

/**
* Set body's linear velocity.
* @param {number} x A floating value to apply on X.
* @param {number} y A floating value to apply on Y.
*/
Kafkaf.PhysicBodyComponent.prototype.setLinearVelocity = function( x, y )
{
    this.instance.SetAwake(true);
    this.instance.SetLinearVelocity(new b2Vec2(x, y));
};

/**
* Apply a force on the body.
* @param {Array.<number>} force Force to apply on each axis.
* @param {Array.<number>} point Offset position from body's center.
*/
Kafkaf.PhysicBodyComponent.prototype.applyForce = function( force, point )
{
    this.instance.SetAwake(true);
    this.instance.ApplyForce(new b2Vec2(force[0], force[1]), new b2Vec2(point[0], point[1]), true);
};

/**
* Apply an angular force on the body.
* @param {number} impulse A floating value.
*/
Kafkaf.PhysicBodyComponent.prototype.applyAngularImpulse = function( impulse )
{
    this.instance.SetAwake(true);
    this.instance.ApplyAngularImpulse(impulse, true);
};

/**
* Apply a linear impulse on the body.
* @param {Array.<number>} force Force to apply on each axis.
* @param {Array.<number>} point Offset position from body's center.
*/
Kafkaf.PhysicBodyComponent.prototype.applyLinearImpulse = function( force, point )
{
    this.instance.SetAwake(true);
    this.instance.ApplyLinearImpulse( new b2Vec2(force[0], force[1]), new b2Vec2(point[0], point[1]), true );
};

/**
* Apply a torque on the body.
* @param {number} torque A floating value.
*/
Kafkaf.PhysicBodyComponent.prototype.applyTorque = function( torque )
{
    this.instance.SetAwake(true);
    this.instance.ApplyTorque(torque, true);
};

/**
* Get body's mass.
* @return {number} A floating value in kg.
*/
Kafkaf.PhysicBodyComponent.prototype.getMass = function()
{
    return this.instance.GetMass();
};

/**
* Get body's velocity.
* @return {Array.<number>} An array with the velocity on each axis.
*/
Kafkaf.PhysicBodyComponent.prototype.getVelocity = function()
{
    var velocity = this.instance.GetLinearVelocity();
    return [velocity.get_x(), velocity.get_y()];
};

/**
* Get body's position.
* @return {Array.<number>} An array with the velocity on each axis.
*/
Kafkaf.PhysicBodyComponent.prototype.getPosition = function()
{
    var position = this.instance.GetPosition();
    return [position.get_x(), position.get_y()];
};

/**
* Get body's rotation.
* @return {number} A floating value in degrees.
*/
Kafkaf.PhysicBodyComponent.prototype.getRotation = function()
{
    return this.instance.GetAngle();
};

/**
* Get body's type.
* @return {Kafkaf.PhysicBodyComponent.BodyType} The type.
*/
Kafkaf.PhysicBodyComponent.prototype.getType = function()
{
    switch(this.instance.GetType())
    {
        case b2_staticBody:
            return Kafkaf.PhysicBodyComponent.BodyType.Static;
        case b2_dynamicBody:
            return Kafkaf.PhysicBodyComponent.BodyType.Dynamic;
        default:
            break;
    }

    return Kafkaf.PhysicBodyComponent.BodyType.Kinematic;
};
