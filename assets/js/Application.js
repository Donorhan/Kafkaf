/**
* Application's entry point.
* @constructor
*/
function Application()
{
    this.loop       = null;
    this.game       = new Game();
    this.graphic    = new Graphic();
    this.physic     = new Physic();
}

/**
* Init the application.
* @return True if everything is ok.
*/
Application.prototype.init = function()
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
Application.prototype.start = function()
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
    EntityLoader.loadFromFile("./assets/catalogs/default.json", function( success )
    {
        if( success )
        {
            // Load level.
            LevelLoader.loadFromFile("./assets/levels/tests.json", _this.game.entityManager, function( success )
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
Application.prototype.update = function( deltaTime )
{
    this.game.update(deltaTime);
    this.physic.update(deltaTime);
};

/**
* Render.
*/
Application.prototype.render = function( deltaTime )
{
    this.graphic.update(deltaTime);
};

/**
* Call on an event.
* @param event An Event instance. 
*/
Application.prototype.onEvent = function( event )
{
    if( event.type == Event.Type.WindowResize )
        this.graphic.setWindowSize(event.x, event.y);

    this.game.onEvent(event);
};