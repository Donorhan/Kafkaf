goog.provide('Kafkaf.PhysicSystem');
goog.require('Kafkaf.PhysicBodyComponent');
goog.require('Kafkaf.Debug');

/**
* Simulate physics.
* @extends {ES.System}
* @constructor
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
    this.physicWorld = new b2World( new b2Vec2(0.0, 25.0) );

    /**
    * Queue with bodies to remove.
    * @type {Array.<b2Body>}
    */
    this.bodiesToRemove = [];

    /**
    * The graphic object where Box2D will draw in debug mode.
    * @type {PIXI.Graphics|null}
    */
    this.debugGraphicObject = null;
}
ES.Utils.extend(ES.System, Kafkaf.PhysicSystem);

/**
* System's entry point.
* @param {number} deltaTime Time elasped since the last update.
*/
Kafkaf.PhysicSystem.prototype.update = function( deltaTime )
{
    // Simulate physic.
    this.physicWorld.Step( 1.0 / 60.0, 3.0, 2.0 );

    // Remove physic bodies.
    for( var i = 0; i < this.bodiesToRemove.length; i++ )
        this.physicWorld.DestroyBody(this.bodiesToRemove[i]);
    this.bodiesToRemove = [];

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
    this.physicWorld.SetDebugDraw( Kafkaf.Debug.getPIXIDebugDraw(this.debugGraphicObject) );

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
        this.bodiesToRemove[this.bodiesToRemove.length] = physicBodyComponent.instance;
};