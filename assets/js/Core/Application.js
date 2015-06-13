'use strict';

/**
* Application's entry point.
* @constructor
*/
Core.Application = function()
{
    if( Core.Application.prototype._singletonInstance )
      return Core.Application.prototype._singletonInstance;

    this.loop       = null;
    this.game       = new Core.Game();
    this.graphic    = new Core.Graphic();
    this.physic     = new Core.Physic();

    Core.Application.prototype._singletonInstance = this;
}

/**
* Init the application.
* @return True if everything is ok.
*/
Core.Application.prototype.init = function()
{
    var initDone = this.game.init() && this.physic.init() && this.graphic.init("application");
    
    // Link engines to the entity manager.
    if( initDone )
    {
        this.game.entityManager.register(this.physic);
        this.game.entityManager.register(this.graphic);
    }

    return initDone;
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

    // Load catalog of objects.
    Core.EntityLoader.loadFromFile("./assets/data/catalog_default.json?" + Math.random(), function( success )
    {
        if( success )
        {
            // Load level.
            Core.LevelLoader.loadFromFile("./assets/data/level_test.json?" + Math.random(), _this.game.entityManager, function( success )
            {
                // Start main loop.
                _this.loop(0);
            });
        }
    });
};

/**
* Update logic.
*/
Core.Application.prototype.update = function( deltaTime )
{
    this.game.update(deltaTime);
    this.physic.update(deltaTime);
};

/**
* Render.
*/
Core.Application.prototype.render = function( deltaTime )
{
    this.graphic.update(deltaTime);
};

/**
* Call on an event.
* @param event An Event instance. 
*/
Core.Application.prototype.onEvent = function( event )
{
    if( event.type == Core.Event.Type.WindowResize )
        this.graphic.setWindowSize(event.x, event.y);

    this.game.onEvent(event);
};