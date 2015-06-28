goog.provide('Kafkaf.Models.Configuration');

/**
* Game's configuration.
* @constructor
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
        var controller          = [];
        controller["type"]      = "keyboard";
        controller["jump"]      = 90;
        controller["left"]      = 81;
        controller["right"]     = 68;
        controller["action"]    = 83;
        this.controllers[0]     = controller;
    }

    // Player 2.
    {
        var controller          = [];
        controller["type"]      = "keyboard";
        controller["jump"]      = 38;
        controller["left"]      = 37;
        controller["right"]     = 39;
        controller["action"]    = 40;
        this.controllers[1]     = controller;
    }

    // Player 3.
    {
        var controller          = [];
        controller["type"]      = "keyboard";
        controller["jump"]      = 73;
        controller["left"]      = 74;
        controller["right"]     = 76;
        controller["action"]    = 75;
        this.controllers[2]     = controller;
    }

    // Player 4.
    {
        var controller          = [];
        controller["type"]      = "keyboard";
        controller["jump"]      = 104;
        controller["left"]      = 100;
        controller["right"]     = 102;
        controller["action"]    = 101;
        this.controllers[3]     = controller;
    }
};

/**
* Load the configuration from a file.
* @param filePath Path to the file with level's data.
* @param callback Callback.
*/
Kafkaf.Models.Configuration.prototype.loadFromFile = function( filePath, callback )
{
    var _this = this;
    loadJSON( filePath, function( JSONData )
    {
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
        _this.controllers = [];
        for( var i = 0; i < JSONData.controls.length; i++ )
        {
            var controllerData          = [];
            controllerData["type"]      = JSONData.controls[i].type;
            controllerData["jump"]      = JSONData.controls[i].jump;
            controllerData["left"]      = JSONData.controls[i].left;
            controllerData["right"]     = JSONData.controls[i].right;
            controllerData["action"]    = JSONData.controls[i].action;
            _this.controllers[_this.controllers.length] = controllerData;
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