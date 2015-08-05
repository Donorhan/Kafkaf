goog.provide('Kafkaf.Modes.BombAvoiderMode');
goog.require('Kafkaf.Modes.GameMode');

/**
* Bomb avoider.
* Rule: Don't be the guy with the bomb.
* @constructor
* @extends {Kafkaf.Modes.GameMode}
* @param {ES.World} world World instance to work with.
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Modes.BombAvoiderMode = function( world )
{
    Kafkaf.Modes.GameMode.call(this, world);
}
goog.inherits(Kafkaf.Modes.BombAvoiderMode, Kafkaf.Modes.GameMode);

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.BombAvoiderMode.prototype.update = function( deltaTime )
{

};

/**
* Call when an event pop.
* @param {ES.Event} event An Event instance.
*/
Kafkaf.Modes.BombAvoiderMode.prototype.onEvent = function( event )
{

};
