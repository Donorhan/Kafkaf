goog.provide('Kafkaf.GameSystem');
goog.require('Kafkaf.Modes.BombAvoiderMode');
goog.require('Kafkaf.Modes.MoneyHunterMode');
goog.require('Kafkaf.Modes.TheCollectorMode');
goog.require('Kafkaf.Modes.TheSurvivorMode');
goog.require('Kafkaf.Modes.TheOneMode');
goog.require('Kafkaf.Modes.RaceMode');
goog.require('Kafkaf.Event.GameEvent');
goog.require('Kafkaf.Models.Level');
goog.require('Kafkaf.PlayerSystem');
goog.require('ES.Utils');

/**
* Game system: Manage game's logic.
* @extends {ES.System}
* @constructor
*/
Kafkaf.GameSystem = function()
{
    ES.System.call(this);

    /**
    * Game mode.
    * @type {Kafkaf.Modes.GameMode|null}
    * @private
    */
    this.mode = null;

    /**
    * Level instance.
    * @type {Kafkaf.Models.Level}
    * @private
    */
    this.level = null;

}
ES.Utils.extend(ES.System, Kafkaf.GameSystem);

/**
* Call when system is activated.
*/
Kafkaf.GameSystem.prototype.onActivation = function()
{
    this.level = new Kafkaf.Models.Level(this.world);    
};

/**
* Start a new game.
* @param {string} levelName Name of the level to load.
* @param {Kafkaf.Modes.GameMode.Mode} mode Mode.
* @param {number} playerCount Player count.
*/
Kafkaf.GameSystem.prototype.startNewGame = function( levelName, mode, playerCount ) 
{
    // Set mode.
    this.setMode(Kafkaf.Modes.GameMode.Mode.TheOne);

    // Load the level and ask to spawn players.
    var _this = this;
    this.loadLevel(levelName, function( success )
    {
        var spawnPoints     = _this.level.getSpawnPoints();
        var playerSystem    = _this.world.getSystem(Kafkaf.PlayerSystem);
        for( var i = 0; i < playerCount; i++ )
            playerSystem.createPlayer( _this.level.getEntityBuilder(), "player_" + i, spawnPoints[i] );
    });
}

/**
* Load a level from his name.
* @param {string} levelName Name of the level to load.
* @param {function(boolean)} callback Function to execute when the level is ready.
*/
Kafkaf.GameSystem.prototype.loadLevel = function( levelName, callback ) 
{
    // Init.
    this.level.init();

    // Load catalog of objects.
    var _this = this;
    this.level.getEntityBuilder().loadPrefabsFromFile("./assets/data/prefabs.json?" + Math.random(), function( success )
    {
        if( success )
        {
            // Load level.
            _this.level.loadFromFile("./assets/data/" + levelName + "?" + Math.random(), function( success )
            {
                callback(success);
            });
        }
    });
};

/**
* System's entry point.
* @param {Kafkaf.Modes.GameMode.Mode} mode Mode to apply.
*/
Kafkaf.GameSystem.prototype.setMode = function( mode )
{
	// Delete previous one.
	delete this.mode;

	// Create new one.
    switch(mode)
    {
    	case Kafkaf.Modes.GameMode.Mode.MoneyHunter:
    		this.mode = new Kafkaf.Modes.MoneyHunterMode(this.world);
    		break;
    	case Kafkaf.Modes.GameMode.Mode.TheOne:
    		this.mode = new Kafkaf.Modes.TheOneMode(this.world);
    		break;
    	case Kafkaf.Modes.GameMode.Mode.TheCollector:
    		this.mode = new Kafkaf.Modes.TheCollectorMode(this.world);
    		break;
    	case Kafkaf.Modes.GameMode.Mode.BombAvoider:
    		this.mode = new Kafkaf.Modes.BombAvoiderMode(this.world);
    		break;
    	case Kafkaf.Modes.GameMode.Mode.Race:
    		this.mode = new Kafkaf.Modes.RaceMode(this.world);
    		break;
    	case Kafkaf.Modes.GameMode.Mode.TheSurvivor:
    	default:
    		this.mode = new Kafkaf.Modes.TheSurvivorMode(this.world);
    		break;
    }
};

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.GameSystem.prototype.update = function( deltaTime )
{
    if( this.mode )
    	this.mode.update(deltaTime);
};

/**
* Call when an event is received.
* @param {ES.Event} event An ES.Event instance.
*/
Kafkaf.GameSystem.prototype.onEvent = function( event ) 
{
    if( event instanceof Kafkaf.Event.GameEvent )
        this.startNewGame("level_test.json", Kafkaf.Modes.GameMode.Mode.TheOne, 2);
    else if( this.mode )
    	this.mode.onEvent(event);
};
