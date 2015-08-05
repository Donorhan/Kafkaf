goog.provide('Kafkaf.Loaders.AILoader');
goog.require('Kafkaf.AIComponent');

/**
* Convert AIComponent JSON to a AIComponent.
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Loaders.AILoader = function() { };

/**
* Create a AIComponent from JSON data.
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {Object} data A String using JSON format.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Loaders.AILoader.prototype.loadFromData = function( entity, data )
{
	var component = new Kafkaf.AIComponent();

	for( var i = 0; i < data.types.length; i++ )
	{
		var value 	= data.types[i].value || 0;
		var type 	= Kafkaf.AIComponent.Type.Unknow;

		switch(data.types[i].name)
		{
			case "AutomaticRotation":
				type = Kafkaf.AIComponent.Type.AutomaticRotation;
				break;
			case "AvoidWalls":
				type = Kafkaf.AIComponent.Type.AvoidWalls;				
				break;
			case "AttackNearEntity":
				type = Kafkaf.AIComponent.Type.AttackNearEntity;				
				break;
			case "AutoExplode":
				type = Kafkaf.AIComponent.Type.AutoExplode;				
				break;
			default:
				continue;
		}

		component.addBehavior(type, value);
	}

	// Add the component.
    entity.addComponent(component);

    return true;
};