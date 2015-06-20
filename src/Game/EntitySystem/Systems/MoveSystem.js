goog.provide('Kafkaf.MoveSystem');
goog.require('Kafkaf.MoveComponent');
goog.require('Kafkaf.PhysicBodyComponent');
goog.require('Kafkaf.Event.MoveEvent');

/**
* Manage entities's movements.
* @extends {ES.System}
* @constructor
*/
Kafkaf.MoveSystem = function()
{
    ES.System.call(this, [Kafkaf.MoveComponent, Kafkaf.PhysicBodyComponent]);
}
ES.Utils.extend(ES.System, Kafkaf.MoveSystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.MoveSystem.prototype.update = function( deltaTime )
{
    for( var i = 0; i < this.entities.length; i++ )
    {
        var moveComponent       = this.entities[i].getComponent(Kafkaf.MoveComponent);
        var physicBodyComponent = this.entities[i].getComponent(Kafkaf.PhysicBodyComponent);

        var velocity = physicBodyComponent.getVelocity();
        if( moveComponent.normal == 0 )
            velocity[0] *= moveComponent.decelerationScale;
        else if( moveComponent.normal < 0 )
            velocity[0] = Math.max( velocity[0] - moveComponent.accelerationScale, -moveComponent.speed );
        else if( moveComponent.normal > 0 )
            velocity[0] = Math.min( velocity[0] + moveComponent.accelerationScale, +moveComponent.speed );

        if( velocity[0] != 0 )
            physicBodyComponent.setLinearVelocity(velocity[0],  velocity[1]);
    }
};

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.MoveSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.MoveEvent )
    {
        var moveComponent = event.entity.getComponent(Kafkaf.MoveComponent);
        if( moveComponent )
            moveComponent.normal = event.normal;
    }
};