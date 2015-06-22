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
    this.setActif(false);

    /**
    * Box2D's contacts listener.
    * @type {JSContactListener}
    * @private
    */
    this.contactListener = new Box2D.JSContactListener();

    // Link instance to system's methods (Box2D <-> custom class binding).
    this.contactListener.BeginContact   = this.beginContact;
    this.contactListener.EndContact     = this.endContact;
    this.contactListener.PreSolve       = this.preSolve;
    this.contactListener.PostSolve      = this.postSolve;

}
ES.Utils.extend(ES.System, Kafkaf.CollisionListenerSystem);

/**
* Callbacks: Link between callback name and methods.
* @type {Array.<name, function>}
*/
Kafkaf.CollisionListenerSystem.callbacks = [];

/**
* Call by Box2D when a contact start.
* @param {string} name Solver's name.
* @param {function} callback Solver's function.
*/
Kafkaf.CollisionListenerSystem.prototype.registerCollisionSolver = function( name, callback )
{
    Kafkaf.CollisionListenerSystem.callbacks[name] = callback;
};

/**
* Call by Box2D when a contact start.
* @param {Object} contact A Box2D contact.
*/
Kafkaf.CollisionListenerSystem.prototype.beginContact = function( contact )
{
    Kafkaf.CollisionListenerSystem.notifyEntities( contact, Kafkaf.CollisionListenerComponent.Type.Begin );
};

/**
* Call by Box2D when a contact end.
* @param {Object} contact A Box2D contact.
*/
Kafkaf.CollisionListenerSystem.prototype.endContact = function( contact )
{
    Kafkaf.CollisionListenerSystem.notifyEntities( contact, Kafkaf.CollisionListenerComponent.Type.End );
};

/**
* Call by Box2D during PreSolve part.
* @param {Object} contact A Box2D contact.
* @param {Object} oldManifold Previous box2D manifold for this contact.
*/
Kafkaf.CollisionListenerSystem.prototype.preSolve = function( contact, oldManifold )
{
    Kafkaf.CollisionListenerSystem.notifyEntities( contact, Kafkaf.CollisionListenerComponent.Type.PreSolve );
};

/**
* Call by Box2D during PostSolve part.
* @param {Object} contact A Box2D contact.
* @param {Object} impulse A Box2D impulse.
*/
Kafkaf.CollisionListenerSystem.prototype.postSolve = function( contact, impulse )
{
    Kafkaf.CollisionListenerSystem.notifyEntities( contact, Kafkaf.CollisionListenerComponent.Type.PostSolve );
};

/**
* Call by Box2D when a contact end.
* @param {Object} contact A Box2D contact.
* @param {Kafkaf.CollisionListenerComponent.Type} type Type of contact
*/
Kafkaf.CollisionListenerSystem.notifyEntities = function( contact, type )
{
    contact         = Box2D.wrapPointer(contact, Box2D.b2Contact);
    var fixtureA    = contact.GetFixtureA();
    var fixtureB    = contact.GetFixtureB();

    if( fixtureA && fixtureB )
    {
        var entityA         = fixtureA.GetBody().userData;
        var entityB         = fixtureB.GetBody().userData;
        var collisionData   = new Kafkaf.CollisionData();

        // Get contact data.
        collisionData.normal[0] = contact.GetManifold().get_localNormal().get_x();
        collisionData.normal[1] = contact.GetManifold().get_localNormal().get_y();

        // Notify entity A.
        var compA = entityA.getComponent(Kafkaf.CollisionListenerComponent);
        if( compA && compA[type] )
        {
            var callback = Kafkaf.CollisionListenerSystem.callbacks[compA[type]];
            if( callback )
            {
                collisionData.entityA   = entityA;
                collisionData.entityB   = entityB;
                collisionData.fixtureA  = fixtureA;
                collisionData.fixtureB  = fixtureB;
                callback( collisionData );
            }
        }

        // Notify entity B.
        var compB = entityB.getComponent(Kafkaf.CollisionListenerComponent);
        if( compB && compB[type] )
        {
            var callback = Kafkaf.CollisionListenerSystem.callbacks[compB[type]];
            if( callback )
            {
                collisionData.entityA   = entityB;
                collisionData.entityB   = entityA;
                collisionData.fixtureA  = fixtureB;
                collisionData.fixtureB  = fixtureA;
                callback( collisionData );
            }
        }
    }
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