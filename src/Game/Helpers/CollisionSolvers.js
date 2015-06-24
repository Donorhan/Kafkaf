goog.require('Kafkaf.PhysicBodyComponent');
goog.require('Kafkaf.Event.DamageEvent');
goog.require('Kafkaf.Event.JumpEvent');
goog.require('Core.Application');

/**
* Add/Create callbacks for collisions.
* @param {Kafkaf.CollisionListenerSystem} system A CollisionListenerSystem instance.
*/
function addCollisionSolvers( system )
{
    function getWorld()
    {
        var application = Core.Application.getInstance();
        if( !application )
            return null;

        var scene = application.getGame().getSceneManager().getActiveScene();
        if( !scene )
            return null;

        return scene.getWorld();
    }

    system.registerCollisionSolver("characterBegin", function( contact )
    {
        if( contact.fixtureA.userData == "foot" )
        {
            getWorld().sendEvent( new Kafkaf.Event.JumpEvent(Kafkaf.Event.JumpEvent.Type.ResetCounter, contact.fixtureA.GetBody().userData) );
        }
        else if( contact.fixtureA.userData == "head" )
        {
            // Send damage event.
            getWorld().sendEvent( new Kafkaf.Event.DamageEvent(contact.fixtureA.GetBody().userData, contact.fixtureB.GetBody().userData) );

            // Bounce effect.
            var velocity = contact.fixtureB.GetBody().GetLinearVelocity().get_x();
            var force = contact.fixtureB.GetBody().GetMass() * 5;
            contact.fixtureB.GetBody().SetLinearVelocity(new b2Vec2(velocity, -force));
        }
    });

    system.registerCollisionSolver("characterEnd", function( contact )
    {

    });
}