goog.provide('Kafkaf.ControllableSystem');
goog.require('Kafkaf.ControllableComponent');
goog.require('Kafkaf.Event.UserEvent');
goog.require('Kafkaf.Event.JumpEvent');
goog.require('Kafkaf.Event.MoveEvent');
goog.require('ES.Utils');

/**
* Game system: Manage game's logic.
* @extends {ES.System}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.ControllableSystem = function()
{
    ES.System.call(this, [Kafkaf.ControllableComponent]);
}
ES.Utils.extend(ES.System, Kafkaf.ControllableSystem);

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.ControllableSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.UserEvent )
    {
        for( var i = 0; i < this.entities.length; i++ )
            this.processEvent(event.event, this.entities[i]);
    }
};

/**
* Process events and convert them to game events.
* @param {Core.Event} event An Core.Event instance.
* @param {ES.Entity} entity An ES.Entity instance.
*/
Kafkaf.ControllableSystem.prototype.processEvent = function( event, entity ) 
{
    switch(event.type)
    {
        case Core.Event.Type.KeyDown:
        case Core.Event.Type.KeyUp:
        {
            var controllableComponent = entity.getComponent(Kafkaf.ControllableComponent);
            if( !controllableComponent )
                break;

            var action = controllableComponent.convertToAction(event.key);

            // Save key state.
            controllableComponent.keyPressed[action] = (event.type == Core.Event.Type.KeyDown);

            // Convert key to action.
            if( event.type == Core.Event.Type.KeyDown )
            {
                if( action == Kafkaf.ControllableComponent.ControlType.Up )
                    this.world.sendEvent( new Kafkaf.Event.JumpEvent(Kafkaf.Event.JumpEvent.Type.AskToJump, entity) );
                
                if( action == Kafkaf.ControllableComponent.ControlType.Left )
                    this.world.sendEvent( new Kafkaf.Event.MoveEvent(entity, -1) );
                else if( action == Kafkaf.ControllableComponent.ControlType.Right )
                    this.world.sendEvent( new Kafkaf.Event.MoveEvent(entity, +1) );
            }
            else if( event.type == Core.Event.Type.KeyUp )
            {
                if( !controllableComponent.keyPressed[Kafkaf.ControllableComponent.ControlType.Left] && 
                    !controllableComponent.keyPressed[Kafkaf.ControllableComponent.ControlType.Right] )
                {
                    this.world.sendEvent( new Kafkaf.Event.MoveEvent(entity,  0) );                    
                }
            }

            break;
        }
        default:
            break;
    }
};