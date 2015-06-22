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
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.JumpSystem.prototype.update = function( deltaTime )
{
    for( var i = 0; i < this.entities.length; i++ )
    {
        var jumpComponent = this.entities[i].getComponent(Kafkaf.JumpComponent);
        jumpComponent.jumpTimeOut = Math.max(jumpComponent.jumpTimeOut - deltaTime, 0);
    }
};

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.JumpSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.JumpEvent )
    {
        var jumpComponent = event.entity.getComponent(Kafkaf.JumpComponent);

        if( event.type == Kafkaf.Event.JumpEvent.Type.AskToJump )
        {
            var physicBodyComponent = event.entity.getComponent(Kafkaf.PhysicBodyComponent);
            if( physicBodyComponent && jumpComponent )
            {
                if( jumpComponent.count < jumpComponent.max && jumpComponent.jumpTimeOut <= 0 )
                {
                    var currentVelocity = physicBodyComponent.getVelocity();
                    physicBodyComponent.setLinearVelocity(currentVelocity[0], -jumpComponent.force);

                    jumpComponent.count++;
                    jumpComponent.jumpTimeOut = jumpComponent.timeBetweenJump;
                }
            }     
        }
        else if( event.type == Kafkaf.Event.JumpEvent.Type.ResetCounter )           
            jumpComponent.count = 0;
    }
};