goog.provide('Kafkaf.PhysicSystem');
goog.require('Kafkaf.PhysicBodyComponent');
goog.require('Kafkaf.Debug');
goog.require('ES.Utils');

/**
* Simulate physics.
* @constructor
* @extends {ES.System}
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.PhysicSystem = function()
{
    ES.System.call(this, [Kafkaf.PhysicBodyComponent]);

    // Init Box2D (emscripten job).
    using(Box2D, "b2.+");

    /**
    * The physic world.
    * @type {b2World}
    */
    this.physicWorld = null;

    /**
    * Queue with bodies to remove.
    * @type {Array.<b2Body>}
    */
    this.bodiesToRemove = [];

    /**
    * The graphic object where Box2D will draw in debug mode.
    * @type {PIXI.Graphics}
    */
    this.debugGraphicObject = null;
}
ES.Utils.extend(ES.System, Kafkaf.PhysicSystem);

/**
* Call when system is activated.
*/
Kafkaf.PhysicSystem.prototype.onActivation = function()
{
    if( this.physicWorld )
        Box2D.destroy(this.physicWorld);

    this.physicWorld = new b2World( new b2Vec2(0.0, 25.0) );
};

/**
* Call when system is inactivated.
*/
Kafkaf.PhysicSystem.prototype.onInactivation = function() 
{
    Box2D.destroy(this.physicWorld);
    this.physicWorld = null;
};

/**
* Call when the system is clear.
*/
Kafkaf.PhysicSystem.prototype.onClear = function() 
{
    // Destroy each physic body.
    for( var i = 0; i < this.entities.length; i++ )
    {
        var physicBodyComponent = this.entities[i].getComponent(Kafkaf.PhysicBodyComponent);
        this.physicWorld.DestroyBody(physicBodyComponent.instance);
    }

    // Clear other data.
    this.bodiesToRemove.length  = 0;
    this.entities.length        = 0;
};

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.PhysicSystem.prototype.update = function( deltaTime )
{
    // Simulate physic.
    this.physicWorld.Step(1.0 / 60.0, 3.0, 2.0);

    // Remove physic bodies.
    for( var i = 0; i < this.bodiesToRemove.length; i++ )
        this.physicWorld.DestroyBody(this.bodiesToRemove[i]);
    this.bodiesToRemove.length = 0;

    // Synchronize physic bodies with entities.
    for( var i = 0; i < this.entities.length; i++ )
    {
        var physicBodyComponent        = this.entities[i].getComponent(Kafkaf.PhysicBodyComponent);
        var transformComponent         = this.entities[i].getComponent(Kafkaf.TransformComponent);

        transformComponent.position.x  = physicBodyComponent.instance.GetPosition().get_x();
        transformComponent.position.y  = physicBodyComponent.instance.GetPosition().get_y();
        transformComponent.rotation    = physicBodyComponent.instance.GetAngle();
    }

    // Draw Box2D's debug.
    if( this.debugGraphicObject )
    {
        this.debugGraphicObject.clear();
        this.physicWorld.DrawDebugData();
    }
};

/**
* Activate debug.
* @return {PIXI.Graphics} An instance of PIXI.Graphics.
*/
Kafkaf.PhysicSystem.prototype.activateDebug = function( )
{
    this.debugGraphicObject = new PIXI.Graphics();
    this.physicWorld.SetDebugDraw(Kafkaf.Debug.getPIXIDebugDraw(this.debugGraphicObject));

    return this.debugGraphicObject;
};

/**
* Call when an entity is removed from the system.
* @param {ES.Entity} entity An ES.Entity instance.
*/
Kafkaf.PhysicSystem.prototype.onEntityRemoved = function( entity ) 
{
    var physicBodyComponent = entity.getComponent(Kafkaf.PhysicBodyComponent);
    if( physicBodyComponent )
        this.bodiesToRemove.push(physicBodyComponent.instance);
};