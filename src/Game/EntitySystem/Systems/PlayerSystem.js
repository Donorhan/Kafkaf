goog.provide('Kafkaf.PlayerSystem');
goog.require('Kafkaf.Helpers.EntityBuilder');

/**
* Manage players.
* @extends {ES.System}
* @constructor
*/
Kafkaf.PlayerSystem = function()
{
    ES.System.call(this);
}
ES.Utils.extend(ES.System, Kafkaf.PlayerSystem);

/**
* Create a new player.
* @param {Kafkaf.Helpers.EntityBuilder} builder The entity builder.
* @param {string} name Name to assign.
*/
Kafkaf.PlayerSystem.prototype.createPlayer = function( builder, name ) 
{
	var player = this.world.createEntity();

	player.setName(name);

	// Add the most important component.
    player.addComponent( new Kafkaf.TransformComponent() );

	// Add character components.
	builder.buildEntityFromPrefab(player, "Character");

	// Controls (ToDo: use configuration file).
    var controllableComponent = new Kafkaf.ControllableComponent();
    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Up,      90 );
    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Down,    83 );
    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Left,    81 );
    controllableComponent.setKey( Kafkaf.ControllableComponent.ControlType.Right,   68 );
    player.addComponent( controllableComponent );

    // Default components.
    player.addComponent( new Kafkaf.LifeComponent( 1 ) );
    player.addComponent( new Kafkaf.MoveComponent() );
    player.addComponent( new Kafkaf.JumpComponent( 10, 2 ) );
    var collisionListener = new Kafkaf.CollisionListenerComponent();
    collisionListener[0] = "characterBegin";
    collisionListener[1] = "characterEnd";
    player.addComponent(collisionListener);
};
