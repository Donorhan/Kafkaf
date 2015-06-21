goog.require('Kafkaf.PhysicBodyComponent');

/**
* Add/Create callbacks for collisions.
* @param {Kafkaf.CollisionListenerSystem} system A CollisionListenerSystem instance.
*/
function addCollisionSolvers( system )
{
    system.registerCollisionSolver("playerBegin", function( contact )
    {
        // ToDo.
    });
}