goog.provide('Kafkaf.Modes.MoneyHunterMode');
goog.require('Kafkaf.Modes.GameMode');

/**
* The Survivor.
* Rule: Attack others players to get more money.
* @constructor
* @extends {Kafkaf.Modes.GameMode}
* @param {ES.World} world World instance to work with.
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Modes.MoneyHunterMode = function( world )
{
    Kafkaf.Modes.GameMode.call(this, world);
}
goog.inherits(Kafkaf.Modes.MoneyHunterMode, Kafkaf.Modes.GameMode);

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.MoneyHunterMode.prototype.update = function( deltaTime )
{

};

/**
* Call when an event pop.
* @param {ES.Event} event An Event instance.
*/
Kafkaf.Modes.MoneyHunterMode.prototype.onEvent = function( event )
{

};
