goog.provide('Kafkaf.CollisionListenerSystem');
goog.require('Kafkaf.CollisionListenerComponent');

/**
* Listen physic world's collisions.
* @extends {ES.System}
* @constructor
*/
Kafkaf.CollisionListenerSystem = function()
{
    ES.System.call(this, [Kafkaf.CollisionListenerComponent]);

    /**
    * Box2D's contacts listener.
    * @type {JSContactListener}
    * @private
    */
    this.contactListener = new Box2D.JSContactListener();

    // Link instance to system's methods.
    this.contactListener.BeginContact   = this.beginContact;
    this.contactListener.EndContact     = this.endContact;
    this.contactListener.PreSolve       = this.preSolve;
    this.contactListener.PostSolve      = this.postSolve;

}
ES.Utils.extend(ES.System, Kafkaf.CollisionListenerSystem);

/**
* Call by Box2D when a contact start.
* @param {Object} contact A Box2D contact.
*/
Kafkaf.CollisionListenerSystem.prototype.beginContact = function( contact )
{
    contact         = Box2D.wrapPointer(contact, Box2D.b2Contact);
    var fixtureA    = contact.GetFixtureA();
    var fixtureB    = contact.GetFixtureB();

    if( fixtureA && fixtureB )
    {
        var entityA = fixtureA.GetBody().userData;
        var entityB = fixtureB.GetBody().userData;

    }
};

/**
* Call by Box2D when a contact end.
* @param {Object} contact A Box2D contact.
*/
Kafkaf.CollisionListenerSystem.prototype.endContact = function( contact )
{
    contact         = Box2D.wrapPointer(contact, Box2D.b2Contact);
    var fixtureA    = contact.GetFixtureA();
    var fixtureB    = contact.GetFixtureB();

    if( fixtureA && fixtureB )
    {
        
    }
};

/**
* Call by Box2D during PreSolve part.
* @param {Object} contact A Box2D contact.
* @param {Object} oldManifold Previous box2D manifold for this contact.
*/
Kafkaf.CollisionListenerSystem.prototype.preSolve = function( contact, oldManifold )
{
    contact     = Box2D.wrapPointer(contact, Box2D.b2Contact);
    oldManifold = Box2D.wrapPointer(oldManifold, Box2D.b2Manifold);
};

/**
* Call by Box2D during PostSolve part.
* @param {Object} contact A Box2D contact.
* @param {Object} impulse A Box2D impulse.
*/
Kafkaf.CollisionListenerSystem.prototype.postSolve = function( contact, impulse )
{
    contact = Box2D.wrapPointer(contact, Box2D.b2Contact);
    impulse = Box2D.wrapPointer(impulse, Box2D.b2ContactImpulse);
};

/**
* Return a reference to the contact listener.
* Useful to link it to the physic world.
*
* @see https://github.com/kripken/box2d.js/ for more informations.
* @return {JSContactListener} A JSContactListener instance.
*/
Kafkaf.CollisionListenerSystem.prototype.getContactListener = function()
{
    return this.contactListener;
};