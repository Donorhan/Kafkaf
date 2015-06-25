goog.provide('Kafkaf.GameSystem');
goog.require('Kafkaf.Modes.BombAvoiderMode');
goog.require('Kafkaf.Modes.MoneyHunterMode');
goog.require('Kafkaf.Modes.TheCollectorMode');
goog.require('Kafkaf.Modes.TheSurvivorMode');
goog.require('Kafkaf.Modes.TheOneMode');
goog.require('Kafkaf.Modes.RaceMode');

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

}
ES.Utils.extend(ES.System, Kafkaf.GameSystem);

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
    if( this.mode )
    	this.mode.onEvent(event);
};
