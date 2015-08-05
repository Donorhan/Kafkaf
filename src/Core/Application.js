goog.provide('Core.Application');

/**
* Application's entry point.
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Core.Application = function()
{
    /**
    * Loop instance: Must be stock in Javascript.
    * @type {function(number)}
    * @private
    */
    this.loop = function( currentTime ) {};

    /**
    * The game instance to run.
    * @type {Core.Game}
    * @private
    */
    this.game = null;
}
goog.addSingletonGetter(Core.Application);

/**
* Init the application.
* @param {Core.Game} game A Game instance.
* @return {boolean} True if everything is ok.
*/
Core.Application.prototype.init = function( game )
{
    this.game = game;
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
        window.requestAnimFrame(_this.loop);

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
    if( this.game )
        this.game.update(deltaTime);
};

/**
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Application.prototype.render = function( deltaTime )
{
    if( this.game )
        this.game.render(deltaTime);
};

/**
* Call when an event pop.
* @param {Core.Event} event An Event instance. 
*/
Core.Application.prototype.onEvent = function( event )
{
    if( this.game )
        this.game.onEvent(event);
};

/**
* Get Game's instance.
* @return {Core.Game} A game instance. 
*/
Core.Application.prototype.getGame = function()
{
    return this.game;
};
