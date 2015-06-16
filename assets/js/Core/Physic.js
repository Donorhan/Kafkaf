'use strict';

/**
* Physic engine entry point.
* @constructor
*/
Core.Physic = function()
{
    this.entities   = [];
    this.world      = null;
    this.gravity    = { x: 0.0, y: 10.0 };
}

/**
* Init.
* @return True if everything is ok.
*/
Core.Physic.prototype.init = function()
{
    // Manage link emscripten/Box2D.
    using(Box2D, "b2.+");

    // Create physic world.
    this.world = new b2World( new b2Vec2(this.gravity.x, this.gravity.y) );

    return true;
};

/**
* Entry point.
* @param deltaTime A floating value representing the time elapsed since the last update.
*/
Core.Physic.prototype.update = function( deltaTime )
{
    // Simulate physic.
    this.world.Step( 1.0 / 60.0, 3.0, 2.0 );

    // Sync physic body with entities.
    for( var i = 0; i < this.entities.length; i++ )
    {
        this.entities[i].commonData.position.x  = this.entities[i].physicComponent.GetPosition().get_x();
        this.entities[i].commonData.position.y  = this.entities[i].physicComponent.GetPosition().get_y();
        this.entities[i].commonData.rotation    = this.entities[i].physicComponent.GetAngle();
    }
};

/**
* Call when entity is create.
* @param entity An entity instance.
*/
Core.Physic.prototype.onEntityCreated = function( entity )
{
    if( entity.physicComponent )
        this.entities[this.entities.length] = entity;
};

/**
* Call when entity is destroy.
* @param entity An entity instance.
*/
Core.Physic.prototype.onEntityDestroyed = function( entity )
{

};