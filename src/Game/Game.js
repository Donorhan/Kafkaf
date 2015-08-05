goog.provide('Kafkaf.Game');
goog.require('Kafkaf.GameScene');
goog.require('Kafkaf.Models.Configuration');
goog.require('Core.Game');

/**
* Manage game's logic.
* @constructor
* @extends {Core.Game}
* @author Donovan ORHAN <dono.orhan@gmail.com>
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
	var _this = this;

	// First we load user's configuration.
    var configuration = Kafkaf.Models.Configuration.getInstance();
    configuration.loadFromFile( "./assets/data/config.json", function(success )
    {
   		_this.sceneManager.pushScene( new Kafkaf.GameScene() );    	
    });

    return true;
};
