goog.provide('Kafkaf.PhysicSystem');
goog.require('Kafkaf.PhysicBodyComponent');

/**
* Simulate physics.
* @extends {ES.System}
* @constructor
*/
Kafkaf.PhysicSystem = function()
{
    ES.System.call(this, [Kafkaf.PhysicBodyComponent]);

    // Init Box2D (emscripten job).
    using(Box2D, "b2.+");

    /**
    * The physic world.
    * @type {b2World}
    */
    this.physicWorld = new b2World( new b2Vec2(0.0, 10.0) );
}
ES.Utils.extend(ES.System, Kafkaf.PhysicSystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.PhysicSystem.prototype.update = function( deltaTime )
{
    // Simulate physic.
    this.physicWorld.Step( 1.0 / 60.0, 3.0, 2.0 );

    // Sync physic body with entities.
    for( var i = 0; i < this.entities.length; i++ )
    {
        var physicBodyComponent        = this.entities[i].getComponent(Kafkaf.PhysicBodyComponent);
        var transformComponent         = this.entities[i].getComponent(Kafkaf.TransformComponent);

        transformComponent.position.x  = physicBodyComponent.instance.GetPosition().get_x();
        transformComponent.position.y  = physicBodyComponent.instance.GetPosition().get_y();
        transformComponent.rotation    = physicBodyComponent.instance.GetAngle();
    }    
};