goog.provide('Kafkaf.Models.Configuration');
goog.require('Utils');

/**
* Game's configuration.
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Models.Configuration = function()
{
    /**
    * Controllers configuration.
    * @type {Array.<Array.<string, number>>}
    * @private
    */
    this.controllers = [];

    /**
    * Indicate if we need to use MSAA.
    * @type {boolean}
    * @private
    */
    this.useMSAA = true;

    /**
    * Graphic quality level.
    * @type {Kafkaf.Models.Configuration.Quality}
    * @private
    */
    this.quality = Kafkaf.Models.Configuration.Quality.High;

    /**
    * Indicate if we want to draw name over players's avatar.
    * @type {boolean}
    * @private
    */
    this.showName = false;

    // Load default values/controllers.
    this.init();
}
goog.addSingletonGetter(Kafkaf.Models.Configuration);

/**
* Quality types available.
* @enum {number}
*/
Kafkaf.Models.Configuration.Quality = { Low: 0, Medium: 1, High: 2 };

/**
* Init configuration with default values.
*/
Kafkaf.Models.Configuration.prototype.init = function()
{
    // Player 1.
    {
        var controllerA          = [];
        controllerA["type"]      = "keyboard";
        controllerA["jump"]      = 90;
        controllerA["left"]      = 81;
        controllerA["right"]     = 68;
        controllerA["action"]    = 83;
        this.controllers[0]      = controllerA;
    }

    // Player 2.
    {
        var controllerB          = [];
        controllerB["type"]      = "keyboard";
        controllerB["jump"]      = 38;
        controllerB["left"]      = 37;
        controllerB["right"]     = 39;
        controllerB["action"]    = 40;
        this.controllers[1]      = controllerB;
    }

    // Player 3.
    {
        var controllerC          = [];
        controllerC["type"]      = "keyboard";
        controllerC["jump"]      = 73;
        controllerC["left"]      = 74;
        controllerC["right"]     = 76;
        controllerC["action"]    = 75;
        this.controllers[2]      = controllerC;
    }

    // Player 4.
    {
        var controllerD          = [];
        controllerD["type"]      = "keyboard";
        controllerD["jump"]      = 104;
        controllerD["left"]      = 100;
        controllerD["right"]     = 102;
        controllerD["action"]    = 101;
        this.controllers[3]      = controllerD;
    }
};

/**
* Load the configuration from a file.
* @param {string} filePath Path to the file with level's data.
* @param {function(boolean)} callback Callback.
*/
Kafkaf.Models.Configuration.prototype.loadFromFile = function( filePath, callback )
{
    var _this = this;
    Utils.loadJSON( filePath, function( JSONData )
    {
        // Cast
        JSONData = /** @type {{game, graphics, controls}} */ (JSONData); 

        // Game.
        _this.showName = JSONData.game.showName || false;

        // Graphics.
        _this.useMSAA = JSONData.graphics.msaa || true;

        if( JSONData.graphics.quality == "high" ) 
            _this.quality = Kafkaf.Models.Configuration.Quality.High;
        else if( JSONData.graphics.quality == "medium" ) 
            _this.quality = Kafkaf.Models.Configuration.Quality.Medium;
        else 
            _this.quality = Kafkaf.Models.Configuration.Quality.Low;            

        // Controllers.
        _this.controllers.length = 0;
        for( var i = 0; i < JSONData.controls.length; i++ )
        {
            var controllerData          = [];
            controllerData["type"]      = JSONData.controls[i].type;
            controllerData["jump"]      = JSONData.controls[i].jump;
            controllerData["left"]      = JSONData.controls[i].left;
            controllerData["right"]     = JSONData.controls[i].right;
            controllerData["action"]    = JSONData.controls[i].action;
            _this.controllers.push(controllerData);
        }

        callback(true);
    })
};

/**
* Get configuration data for the asked controller.
* @param {number} index Controller's index: Player 1 = index 1.
* @return {Array.<string, number>} Controller data.
*/
Kafkaf.Models.Configuration.prototype.getController = function( index )
{
    if( index >= this.controllers.length )
        return this.controllers[0];

    return this.controllers[index];
};