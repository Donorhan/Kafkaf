goog.provide('Kafkaf.Modes.GameMode');

/**
* Abstract game mode.
* @param {ES.World} world World instance to work with.
* @constructor
*/
Kafkaf.Modes.GameMode = function( world )
{
    /**
    * The world instance: entities/components and systems management.
    * @type {ES.World}
    * @private
    */
    this.world = world;

    /**
    * Indicate if game is over.
    * @type {boolean}
    * @private
    */
    this.over = false;
}

/**
* Modes availables.
* @enum {number}
*/
Kafkaf.Modes.GameMode.Mode = { TheSurvivor: 0, MoneyHunter: 1, TheOne: 2, TheCollector: 3, BombAvoider: 4, Race: 5 };

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.Modes.GameMode.prototype.update = function( deltaTime ) {};

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Kafkaf.Modes.GameMode.prototype.onEvent = function( event ) {};

/**
* Get mode's state.
* @return {boolean} True if game is over. 
*/
Kafkaf.Modes.GameMode.prototype.isOver = function()
{
    return this.over;
};
