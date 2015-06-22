goog.provide('Kafkaf.Game');
goog.require('Kafkaf.GameScene');
goog.require('Core.Game');

/**
* Manage game's logic.
* @constructor
*/
Kafkaf.Game = function()
{
    Core.Game.call(this);
}
goog.inherits(Kafkaf.Game, Core.Game);

/**
* Init.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Game.prototype.init = function()
{
    // Push default scene.
    this.sceneManager.pushScene( new Kafkaf.GameScene() );

    return true;
};
