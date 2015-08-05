goog.provide('Kafkaf.LifeSystem');
goog.require('Kafkaf.LifeComponent');
goog.require('Kafkaf.Event.DamageEvent');
goog.require('Kafkaf.Event.DeadEvent');
goog.require('ES.Utils');

/**
* Manage entities's life.
* @extends {ES.System}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.LifeSystem = function()
{
    ES.System.call(this, [Kafkaf.LifeComponent]);
}
ES.Utils.extend(ES.System, Kafkaf.LifeSystem);

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.LifeSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.DamageEvent )
    {
        var lifeComponent     = event.victim.getComponent(Kafkaf.LifeComponent);
        lifeComponent.amount -= 1; // ToDo: Take in account other entity's attributs (ex: weapon's type, weight, …).

        if( lifeComponent.amount <= 0 )
            this.world.sendEvent( new Kafkaf.Event.DeadEvent(event.victim, event.agressor) );
    }
};