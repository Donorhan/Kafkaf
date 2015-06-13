'use strict';

/**
* Application's entry point.
* @constructor
*/
Kafkaf.Application = function()
{
    if( Kafkaf.Application.prototype._singletonInstance )
      return Kafkaf.Application.prototype._singletonInstance;

    this.loop       = null;
    this.game       = new Kafkaf.Game();
    this.graphic    = new Kafkaf.Graphic();
    this.physic     = new Kafkaf.Physic();

    Kafkaf.Application.prototype._singletonInstance = this;
}

/**
* Init the application.
* @return True if everything is ok.
*/
Kafkaf.Application.prototype.init = function()
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
Kafkaf.Application.prototype.start = function()
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
    Kafkaf.EntityLoader.loadFromFile("./assets/data/catalog_default.json?" + Math.random(), function( success )
    {
        if( success )
        {
            // Load level.
            Kafkaf.LevelLoader.loadFromFile("./assets/data/level_test.json?" + Math.random(), _this.game.entityManager, function( success )
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
Kafkaf.Application.prototype.update = function( deltaTime )
{
    this.game.update(deltaTime);
    this.physic.update(deltaTime);
};

/**
* Render.
*/
Kafkaf.Application.prototype.render = function( deltaTime )
{
    this.graphic.update(deltaTime);
};

/**
* Call on an event.
* @param event An Event instance. 
*/
Kafkaf.Application.prototype.onEvent = function( event )
{
    if( event.type == Kafkaf.Event.Type.WindowResize )
        this.graphic.setWindowSize(event.x, event.y);

    this.game.onEvent(event);
};