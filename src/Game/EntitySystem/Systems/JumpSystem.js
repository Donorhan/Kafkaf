goog.provide('Kafkaf.JumpSystem');
goog.require('Kafkaf.JumpComponent');
goog.require('Kafkaf.Event.JumpEvent');

/**
* Manage entities's jumps.
* @extends {ES.System}
* @constructor
*/
Kafkaf.JumpSystem = function()
{
    ES.System.call(this, [Kafkaf.JumpComponent]);
}
ES.Utils.extend(ES.System, Kafkaf.JumpSystem);

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.JumpSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.JumpEvent )
    {
        var jumpComponent       = event.entity.getComponent(Kafkaf.JumpComponent);
        var physicBodyComponent = event.entity.getComponent(Kafkaf.PhysicBodyComponent);
        if( physicBodyComponent && jumpComponent )
        {
            if( jumpComponent.count < jumpComponent.max )
            {
                var currentVelocity = physicBodyComponent.getVelocity();
                physicBodyComponent.setLinearVelocity(currentVelocity[0], -jumpComponent.force);

                jumpComponent.count++;
            }
        }
    }
};