goog.require('Kafkaf.PhysicBodyComponent');
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
        var fixtureA = contact.fixtureA;
        if( fixtureA.userData == "body" )
        {
            if( fixtureA.GetBody().GetLinearVelocity().get_y() > 0 )
                getWorld().sendEvent( new Kafkaf.Event.JumpEvent(Kafkaf.Event.JumpEvent.Type.ResetCounter, fixtureA.GetBody().userData) );
        }
    });

    system.registerCollisionSolver("characterEnd", function( contact )
    {
        /*var fixtureA    = contact.GetFixtureA();
        var fixtureB    = contact.GetFixtureB();

        if( fixtureA.userData == "body" )
        {

        }*/
    });
}