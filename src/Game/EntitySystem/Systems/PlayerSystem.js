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

    /**
    * Players.
    * @type {Array.<ES.Entity>}
    * @private
    */
    this.players = [];
}
ES.Utils.extend(ES.System, Kafkaf.PlayerSystem);

/**
* Call when the system is clear.
*/
Kafkaf.PlayerSystem.prototype.onClear = function() 
{
    this.players = [];
};

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
    var transformable           = new Kafkaf.TransformComponent();
    transformable.position.x    = -2 + (this.players.length * 2);
    transformable.position.y    = -2;
    player.addComponent(transformable);

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

    this.players[this.players.length] = player;
};

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.PlayerSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.DeadEvent )
    {
        var index = -1;
        for( var i = 0; i < this.players.length; i++ )
            if( this.players[i] == event.victim )
                index = i;

        if( index > -1 )
            this.players.splice(index, 1);
    }
};

/**
* Get player count.
* @return {number} Player count.
*/
Kafkaf.PlayerSystem.prototype.getPlayerCount = function() 
{
    return this.players.length;
}

/**
* Indicate if the given entity is an entity controlled by a player.
* @param {ES.Entity} entity An ES.Entity intance.
* @return {boolean} True if the entity is a player.
*/
Kafkaf.PlayerSystem.prototype.isPlayer = function( entity ) 
{
    for( var i = 0; i < this.players.length; i++ )
        if( this.players[i] == entity )
            return true;

    return false;
}

