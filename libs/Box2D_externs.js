/**
 * Box2D's namespace.
 * @const
 */
function Box2D() {};

/**
* A vec2.
* @constructor
* @param {number} x Value on X.
* @param {number} y Value on Y.
*/
Box2D.b2Vec2 = function(x, y) {};

/**
* A physic world.
* @param {b2World} world A b2World instance.
*/
Box2D.destroy = function(world) {};

/**
* Wrap pointer to emscripten.
* @param {Object} vert A b2World instance.
* @param {Object} obj An Object name.
*/
Box2D.wrapPointer = function(vert, obj) {};

/**
* A JSDraw instance.
* @constructor
*/
Box2D.JSDraw = function() {};

/**
* Set debug draw flags.
* @param {number} value Flags.
*/
Box2D.JSDraw.prototype.SetFlags = function( value ) {};

/**
* A contact listener instance.
* @constructor
*/
Box2D.JSContactListener = function() {};

/**
* A transform element.
* @constructor
*/
Box2D.b2Transform = function() {};

/**
* A color.
* @constructor
*/
Box2D.b2Color = function() {};

/**
* A contact.
* @constructor
*/
Box2D.b2Contact = function() {};

/**
* A filter.
* @return {b2Filter}
*/
Box2D.b2Contact.prototype.GetFixtureA = function() {};

/**
* A filter.
* @return {b2Filter}
*/
Box2D.b2Contact.prototype.GetFixtureB = function() {};

/**
* A filter.
* @return {b2Filter}
*/
Box2D.b2Contact.prototype.GetManifold = function() {};

/**
* A manifold.
* @constructor
*/
Box2D.b2Manifold = function() {};

/**
* Get manifold's normal.
* @return {b2Vec2}
*/
Box2D.b2Manifold.prototype.get_localNormal = function() {};

/**
* Red value.
* @return {number}
*/
Box2D.b2Color.prototype.get_r = function() {};

/**
* Green value.
* @return {number}
*/
Box2D.b2Color.prototype.get_g = function() {};

/**
* Blue value.
* @return {number}
*/
Box2D.b2Color.prototype.get_b = function() {};

/**
* Body's type.
* @type {number}
* @const
*/
var b2_staticBody = 0;

/**
* Body's type.
* @type {number}
* @const
*/
var b2_dynamicBody = 0;

/**
* Body's type.
* @type {number}
* @const
*/
var b2_kinematicBody = 0;

/**
* A vec2.
* @constructor
* @param {number} x Value on X.
* @param {number} y Value on Y.
*/
function b2Vec2(x, y) {};

/**
* Return x attribut.
* @return {number}
*/
b2Vec2.prototype.get_x = function() { return 0; };

/**
* Return x attribut.
* @return {number}
*/
b2Vec2.prototype.get_y = function() { return 0; };

/**
* A physic world.
* @constructor
* @param {b2Vec2=} gravity Gravity.
*/
function b2World(gravity) {};

/**
* Create a physic body.
* @return {b2Body}.
*/
b2World.prototype.CreateBody = function() {};

/**
* Destroy body.
* @param {b2Body} body A body instance.
*/
b2World.prototype.DestroyBody = function( body ) {};

/**
* Draw debug world.
*/
b2World.prototype.DrawDebugData = function() {};

/**
* Step physic world.
* @param {number} a Timestep.
* @param {number} b Look box2D's doc.
* @param {number} c Look box2D's doc.
*/
b2World.prototype.Step = function( a, b, c ) {};

/**
* Set contact listener.
* @param {Box2D.JSContactListener} i A constact listener.
*/
b2World.prototype.SetContactListener = function(i) {};

/**
* Body definition.
* @constructor
*/
function b2Body() {};

/**
* Apply angular damping.
* @param {number} v Value.
* @param {boolean} b True to wake up the body.
*/
b2Body.prototype.ApplyAngularImpulse = function(v, b) {};

/**
* Apply force.
* @param {b2Vec2} v A vec2.
* @param {b2Vec2} o A vec2.
* @param {boolean} b True to wake up the body.
*/
b2Body.prototype.ApplyForce = function(v, o, b) {};

/**
* Apply linear impulse.
* @param {b2Vec2} v A vec2.
* @param {b2Vec2} o A vec2.
* @param {boolean} b True to wake up the body.
*/
b2Body.prototype.ApplyLinearImpulse = function(v, o, b) {};

/**
* Get angle.
* @param {number} t Torque value.
* @param {boolean} v True to wake up the body.
*/
b2Body.prototype.ApplyTorque = function(t, v) {};

/**
* Set active.
* @param {boolean} b True to activate the body.
*/
b2Body.prototype.SetActive = function(b) {};

/**
* Set angular damping.
* @param {number} v A floating value.
*/
b2Body.prototype.SetAngularDamping = function(v) {};

/**
* Set angular velocity.
* @param {number} v A floating value.
*/
b2Body.prototype.SetAngularVelocity = function(v) {};

/**
* Set awake.
* @param {boolean} b True to wake up the body.
*/
b2Body.prototype.SetAwake = function(b) {};

/**
* Set body as a bullet.
* @param {boolean} b True to set as a bullet.
*/
b2Body.prototype.SetBullet = function(b) {};

/**
* Set rotation's state.
* @param {boolean} b True to stop rotation.
*/
b2Body.prototype.SetFixedRotation = function( b ) {};

/**
* Set gravity scale.
* @param {number} s A floatting value.
*/
b2Body.prototype.SetGravityScale = function( s ) {};

/**
* Set linear damping.
* @param {number} v A value.
*/
b2Body.prototype.SetLinearDamping = function( v ) {};

/**
* Set linear damping.
* @param {b2Vec2} v A vec2.
*/
b2Body.prototype.SetLinearVelocity = function( v ) {};

/**
* Set transform.
* @param {b2Vec2} v Position.
* @param {number} angle Rotation.
*/
b2Body.prototype.SetTransform = function( v, angle ) {};

/**
* Set type.
* @param {number} type Type.
*/
b2Body.prototype.SetType = function( type  ) {};

/**
* Set user data.
* @param {Object} o User data.
*/
b2Body.prototype.SetUserData = function( o ) {};

/**
* Get velocity.
* @return {b2Vec2}
*/
b2Body.prototype.GetLinearVelocity = function() {};

/**
* Get velocity.
* @return {b2Vec2}
*/
b2Body.prototype.GetPosition = function() {};

/**
* Get angle.
* @return {number}
*/
b2Body.prototype.GetAngle = function() {};

/**
* Get angle.
* @return {number}
*/
b2Body.prototype.GetMass = function() {};

/**
* Get type.
* @return {number}
*/
b2Body.prototype.GetType = function() {};

/**
* Body definition.
* @constructor
*/
function b2BodyDef() {};

/**
* Set type.
* @param {number} n A value.
*/
b2BodyDef.prototype.set_type = function(n) {};

/**
* A filter.
* @constructor
*/
function b2Filter() {};

/**
* Set category.
* @param {number} v A value.
*/
b2Filter.prototype.set_categoryBits = function( v ) {};

/**
* Set mask.
* @param {number} v A value.
*/
b2Filter.prototype.set_maskBits = function( v ) {};

/**
* Set group.
* @param {number} v A value.
*/
b2Filter.prototype.set_groupIndex = function( v ) {};

/**
* Fixture definition.
* @constructor
*/
function b2FixtureDef() {};

/**
* Get filter.
* @return {b2Filter}
*/
b2FixtureDef.prototype.get_filter = function() {};

/**
* Set shape.
* @param {Object} shape A box2D shape.
*/
b2FixtureDef.prototype.set_shape = function( shape ) {};

/**
* Set as a sensor.
* @param {boolean} value True to set as sensor.
*/
b2FixtureDef.prototype.set_isSensor = function( value ) {};

/**
* Set density.
* @param {number} value Density value.
*/
b2FixtureDef.prototype.set_density = function( value ) {};

/**
* Set friction.
* @param {number} value Friction value.
*/
b2FixtureDef.prototype.set_friction = function( value ) {};

/**
* Set restitution.
* @param {number} value Restitution value.
*/
b2FixtureDef.prototype.set_restitution = function( value ) {};

/**
* A fixture.
* @constructor
*/
function b2Fixture() {};

/**
* Get body.
* @return {b2Body}.
*/
b2Fixture.prototype.GetBody = function() {};

/**
* A shape (circle).
* @constructor
*/
function b2CircleShape() {};

/**
* A shape (circle).
* @constructor
*/
function b2PolygonShape() {};

/**
 * Create a shape.
 * @param {Array.<number>} vertices An array of vertices.
 * @return {b2PolygonShape} A polygon.
 */
function createPolygonShape(vertices) { return null; };

/**
 * Using method from emscripten helper.
 * @param {Object} obj An object instance.
 * @param {string} name A string.
 */
function using(obj, name) {};

/**
 * Temp.
 */
function PIXI() {};

/**
 * Pixi graphics
 * @constructor
 */
PIXI.Graphics = function() {};

/**
 * Pixi Container
 * @constructor
 */
PIXI.Container = function() {};

/**
 * Pixi WebGLRenderer
 * @constructor
 * @param {Object} o Object.
 */
PIXI.WebGLRenderer = function( o ) {};

/**
 * Pixi texture
 * @constructor
 * @param {Object} o Object.
 */
PIXI.Texture = function( o ) {};

/**
 * Pixi Sprite
 * @constructor
 * @param {PIXI.Texture} o Texture.
 */
PIXI.Sprite = function( o ) {};
