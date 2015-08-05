goog.provide('Kafkaf.Modes.TheOneMode');
goog.require('Kafkaf.Modes.GameMode');
goog.require('Kafkaf.Event.DeadEvent');
goog.require('Kafkaf.Event.GameEvent');

/**
* The Survivor.
* Rule: Kill the others players to win the game.
* @constructor
* @extends {Kafkaf.Modes.GameMode}
* @param {ES.World} world World instance to work with.
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Modes.TheOneMode = function( world )
{
    Kafkaf.Modes.GameMode.call(this, world);

    /**
    * Indicate if we need to check for updates.
    * @type {boolean}
    * @private
    */
    this.needToCheck = false;

    /**
    * Array with the score (kill counter) for each player.
    * @type {Array.<number>}
    * @private
    */
    this.scores = [];
}
goog.inherits(Kafkaf.Modes.TheOneMode, Kafkaf.Modes.GameMode);

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.TheOneMode.prototype.update = function( deltaTime )
{
    if( this.needToCheck && !this.over )
    {
        var playerSystem = this.world.getSystem(Kafkaf.PlayerSystem);
        if( !playerSystem )
            return;

        if( playerSystem.getPlayerCount() <= 1 )
        {
            this.world.sendEvent( new Kafkaf.Event.GameEvent(Kafkaf.Event.GameEvent.Type.GameOver) );
            this.over = true;
        }

        // End game.
        this.needToCheck = false;
    }
};

/**
* Call when an event pop.
* @param {ES.Event} event An Event instance. 
*/
Kafkaf.Modes.TheOneMode.prototype.onEvent = function( event )
{
    if( event instanceof Kafkaf.Event.DeadEvent )
    {
        // Destroy the entity.
        this.world.destroyEntity(event.victim);

        // Add a point to the killer.       
        var playerSystem = this.world.getSystem(Kafkaf.PlayerSystem);
        if( !playerSystem )
            return;

        if( playerSystem.isPlayer(event.killer) )
            this.scores[event.killer.id] = (this.scores[event.killer.id] + 1) || 1;

        // Ask an update of the model.
        this.needToCheck = true;
    }
};
