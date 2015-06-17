goog.provide('Core.Application');

/**
* Application's entry point.
* @param {Core.Game} game A Game instance.
* @constructor
*/
Core.Application = function( game )
{
    goog.addSingletonGetter(Core.Application);

    /**
    * Loop instance: Must be stocked in Javascript.
    * @type {function}
    * @private
    */
    this.loop = null;

    /**
    * The game instance to run.
    * @type {Core.Game}
    * @private
    */
    this.game = game;
}

/**
* Init the application.
* @return {boolean} True if everything is ok.
*/
Core.Application.prototype.init = function()
{
    return this.game.init();
};

/**
* Start the application.
*/
Core.Application.prototype.start = function()
{
    var _this           = this;
    var previousTime    = 0;

    this.loop = function( currentTime )
    {
        requestAnimFrame(_this.loop);

        // Compute delta time.
        var deltaTime   = currentTime - previousTime;
        previousTime    = currentTime;

        // Call main methods.
        _this.update( deltaTime );
        _this.render( deltaTime );
    };
    _this.loop(0);
};

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Application.prototype.update = function( deltaTime )
{
    this.game.update(deltaTime);
};

/**
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Application.prototype.render = function( deltaTime )
{
    this.game.render(deltaTime);
};

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Core.Application.prototype.onEvent = function( event )
{
    this.game.onEvent(event);
};