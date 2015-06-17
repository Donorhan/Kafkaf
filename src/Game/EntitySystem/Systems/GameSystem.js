goog.provide('Kafkaf.GameSystem');

/**
* Game system: Manage game's logic.
* @extends {ES.System}
* @constructor
*/
Kafkaf.GameSystem = function()
{
    ES.System.call(this);
}
ES.Utils.extend(ES.System, Kafkaf.GameSystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.GameSystem.prototype.update = function( deltaTime )
{
    
};