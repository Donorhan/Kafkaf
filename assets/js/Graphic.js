/**
* Graphic part entry point.
* @constructor
*/
function Graphic()
{
    this.entities   = [];
    this.renderer   = null;
    this.scene      = null;
    this.view       = null;
}

/**
* Init.
* @param parentView A string representing view's identifier in the DOM. 
* @return True if everything is ok.
*/
Graphic.prototype.init = function( parentView )
{
    // Link view.
    this.view = document.getElementById(parentView);
    if( !this.view )
    {
        console.log("Unable to found \"" + parentView + "\"");
        return false;
    }

    // Init Pixi.
    this.renderer           = PIXI.autoDetectRenderer( this.view.clientWidth, this.view.clientHeight, { backgroundColor : 0x333333, antialias: true } );
    this.scene              = new PIXI.Container();

    // Default scale.
    this.scene.scale.x      = 70.0;
    this.scene.scale.y      = 70.0;

    // Center camera by default.
    this.scene.position.x   = this.view.clientWidth  / 2.0;
    this.scene.position.y   = this.view.clientHeight / 2.0;

    this.view.appendChild(this.renderer.view);

    return true;
};

/**
* Set window's size.
* @param width An integer.
* @param heiht An integer.
*/
Graphic.prototype.setWindowSize = function( x, y )
{
    this.renderer.view.style.width  = x + 'px';
    this.renderer.view.style.height = y + 'px';
};

/**
* Entry point.
* @param deltaTime A floating value represeting the time elapsed since the last update.
*/
Graphic.prototype.update = function( deltaTime )
{
    // Update positions.
    for( var i = 0; i < this.entities.length; i++ )
    {
        // Update position and rotation.
        this.entities[i].graphicComponent.position.x    = this.entities[i].commonData.position.x;
        this.entities[i].graphicComponent.position.y    = this.entities[i].commonData.position.y;
        this.entities[i].graphicComponent.rotation      = this.entities[i].commonData.rotation;

        // Update size.
        this.entities[i].graphicComponent.scale.x       = (1.0 / this.entities[i].graphicComponent.texture.width) * this.entities[i].commonData.scale.x;
        this.entities[i].graphicComponent.scale.y       = (1.0 / this.entities[i].graphicComponent.texture.height) * this.entities[i].commonData.scale.y;
    }

    this.renderer.render(this.scene);
};

/**
* Call when entity is create.
* @param entity An entity instance.
*/
Graphic.prototype.onEntityCreated = function( entity )
{
    if( entity.graphicComponent )
    {
        this.scene.addChild(entity.graphicComponent);
        this.entities[this.entities.length] = entity;       
    }
};

/**
* Call when entity is destroy.
* @param entity An entity instance.
*/
Graphic.prototype.onEntityDestroyed = function( entity )
{

};