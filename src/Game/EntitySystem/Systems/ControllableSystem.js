goog.provide('Kafkaf.ControllableSystem');
goog.require('Kafkaf.ControllableComponent');
goog.require('Kafkaf.Event.UserEvent');
goog.require('Kafkaf.Event.JumpEvent');
goog.require('Kafkaf.Event.MoveEvent');

/**
* Game system: Manage game's logic.
* @extends {ES.System}
* @constructor
*/
Kafkaf.ControllableSystem = function()
{
    ES.System.call(this, [Kafkaf.ControllableComponent]);
}
ES.Utils.extend(ES.System, Kafkaf.ControllableSystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.ControllableSystem.prototype.update = function( deltaTime )
{
    for( var i = 0; i < this.entities.length; i++ )
    {
        var controllableComponent = this.entities[i].getComponent(Kafkaf.ControllableComponent);

        if( controllableComponent.keyPressed[Kafkaf.ControllableComponent.ControlType.Up] == true )
            this.world.sendEvent( new Kafkaf.Event.JumpEvent(this.entities[i]) );
        
        if( controllableComponent.keyPressed[Kafkaf.ControllableComponent.ControlType.Left] == true )
            this.world.sendEvent( new Kafkaf.Event.MoveEvent(this.entities[i], -1) );
        else if( controllableComponent.keyPressed[Kafkaf.ControllableComponent.ControlType.Right] == true )
            this.world.sendEvent( new Kafkaf.Event.MoveEvent(this.entities[i], +1) );
        else 
            this.world.sendEvent( new Kafkaf.Event.MoveEvent(this.entities[i],  0) );
    }
};

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
* Process event and convert it to a game event.
* @param {ES.Event} event An ES.Event instance.
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
            controllableComponent.keyPressed[action] = (event.type == Core.Event.Type.KeyDown);

            break;
        }
        default:
            break;
    }
};