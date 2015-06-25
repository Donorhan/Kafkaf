goog.provide('Kafkaf.Modes.BombAvoiderMode');
goog.require('Kafkaf.Modes.GameMode');

/**
* Bomb avoider.
* Rule: Don't be the guy with the bomb.
* @param {ES.World} world World instance to work with.
* @constructor
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
* @param {Core.Event} event An Event instance. 
*/
Kafkaf.Modes.BombAvoiderMode.prototype.onEvent = function( event )
{

};
