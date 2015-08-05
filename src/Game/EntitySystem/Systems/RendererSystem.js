goog.provide('Kafkaf.RendererSystem');
goog.require('Kafkaf.SpriteComponent');
goog.require('ES.Utils');

/**
* Render the game.
* @param {string} parentView A string representing the DOM element's name to use. 
* @extends {ES.System}
* @constructor
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.RendererSystem = function( parentView )
{
    ES.System.call(this/*, [Kafkaf.SpriteComponent]*/);

    var view = document.getElementById(parentView);
    if( !view )
    {
        console.log("Unable to found \"" + parentView + "\"");
        return;
    }

    /**
    * Pixi's renderer.
    * @type {PIXI.WebGLRenderer|PIXI.CanvasRenderer}
    * @private
    */
    this.renderer = PIXI.autoDetectRenderer( view.clientWidth, view.clientHeight, { backgroundColor : 0x333333, antialias: true } );

    /**
    * Main scene.
    * @type {PIXI.Container}
    * @private
    */
    this.scene = new PIXI.Container();

    // Configure the scene.
    this.scene.scale.x      = 45.0;
    this.scene.scale.y      = 45.0;
    this.scene.position.x   = view.clientWidth  / 2.0;
    this.scene.position.y   = view.clientHeight / 2.0;
    this.scene.position.y  += 300;
    view.appendChild(this.renderer.view);

    /**
    * This system must be call manually out of the logic part.
    * So I inactivate it to call it manually from the rendering entry's point.
    */
    this.setActif(false);
}
ES.Utils.extend(ES.System, Kafkaf.RendererSystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.RendererSystem.prototype.update = function( deltaTime )
{
    // Update pixi's elements.
    for( var i = 0; i < this.entities.length; i++ )
    {
        var spriteComponent                      = this.entities[i].getComponent(Kafkaf.SpriteComponent);
        var transformComponent                   = this.entities[i].getComponent(Kafkaf.TransformComponent);

        // Update position and rotation.
        spriteComponent.instance.position.x      = transformComponent.position.x;
        spriteComponent.instance.position.y      = transformComponent.position.y;
        spriteComponent.instance.rotation        = transformComponent.rotation;

        // Update size.
        spriteComponent.instance.scale.x         = (1.0 / spriteComponent.instance.texture.width)  * transformComponent.scale.x;
        spriteComponent.instance.scale.y         = (1.0 / spriteComponent.instance.texture.height) * transformComponent.scale.y;
    }

    // Draw scene.
    this.renderer.render(this.scene);
};

/**
* Call when an entity is added to the system.
* @param {ES.Entity} entity An ES.Entity instance.
*/
Kafkaf.RendererSystem.prototype.onEntityAdded = function( entity )
{
    var spriteComponent = entity.getComponent(Kafkaf.SpriteComponent);
    this.scene.addChild(spriteComponent.instance);
};
