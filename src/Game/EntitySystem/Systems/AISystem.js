goog.provide('Kafkaf.AISystem');
goog.require('Kafkaf.AIComponent');
goog.require('Kafkaf.PhysicBodyComponent');
goog.require('ES.Utils');

/**
* Game system: Manage game's logic.
* @extends {ES.System}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.AISystem = function()
{
    ES.System.call(this, [Kafkaf.AIComponent]);
}
ES.Utils.extend(ES.System, Kafkaf.AISystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.AISystem.prototype.update = function( deltaTime )
{
    for( var i = 0; i < this.entities.length; i++ )
    {
        var aiComponent = this.entities[i].getComponent(Kafkaf.AIComponent);
        for( var j = 0; j < aiComponent.behaviors.length; j++ )
        {
            if( aiComponent.behaviors[j].type == Kafkaf.AIComponent.Type.AutomaticRotation )
            {
                var physicBodyComponent = this.entities[i].getComponent(Kafkaf.PhysicBodyComponent);
                if( physicBodyComponent )
                    physicBodyComponent.setAngularVelocity(aiComponent.behaviors[j].value);
            }
        }
    }
};
