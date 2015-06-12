'use strict';

/**
* Manage entities.
* @constructor
*/
Kafkaf.EntityManager = function()
{   
    this.entities       = [];
    this.listeners      = [];
    this.createQueue    = [];   ///< Entities waiting to be added to systems/listeners.
    this.destroyQueue   = [];   ///< Entities waiting to be destroyed.
}

/**
* Update.
* @param deltaTime A floating value representing the time elapsed since the last update.
*/
Kafkaf.EntityManager.prototype.update = function( deltaTime )
{
    // Process "create queue".
    for( var i = 0; i < this.createQueue.length; i++ )
        for( var j = 0; j < this.listeners.length; j++ )
            this.listeners[j].onEntityCreated(this.createQueue[i]);

    // Process "destroy queue".
    //for( var i = 0; i < this.destroyQueue.length; i++ )
        // ToDo: Remove entity from entities array here.

    this.createQueue    = [];
    this.destroyQueue   = [];
};

/**
* Create a new entity.
* @param name A string representing the name to assign, can be null.
* @return An Entity instance.
*/
Kafkaf.EntityManager.prototype.createEntity = function( name )
{
    // Create entity.
    var entity                          = new Kafkaf.Entity();
    entity.commonData.name              = name;
    this.entities[this.entities.length] = entity;

    // Add to destroy queue.
    this.createQueue[this.createQueue.length] = entity;

    return entity;
};

/**
* Destroy the given entity.
* @param entity An Entity instance.
*/
Kafkaf.EntityManager.prototype.destroyEntity = function( entity )
{
    // Notify listeners.
    for( var i = 0; i < this.listeners.length; i++ )
        this.listeners[i].onEntityDestroyed(entity);

    // Add to destroy queue.
    this.destroyQueue[this.destroyQueue.length] = entity;

    return entity;
};

/**
* Set name of an entity.
* @param entity An Entity instance.
* @param name A string.
* @return True if everything is ok.
*/
Kafkaf.EntityManager.prototype.setEntityName = function( entity, name )
{
    if( this.getEntity(name) )
        return false;

    // Set name.
    entity.commonData.name = name;

    return true;
};

/**
* Get entity with the given name.
* @param name A string.
* @return An Entity instance or null.
*/
Kafkaf.EntityManager.prototype.getEntity = function( name )
{
    for( var i = 0; i < this.entities.length; i++ )
        if( this.entities[i].commonData.name == name )
            return this.entities[i];

    return null;
};

/**
* Register an instance to the EntityManager.
*  
* A registered object will be warn about creation and suppression of entities.
*
* Warning: The instance must implement the following methods:
* - onEntityCreated
* - onEntityDestroyed
*
* @param instance Instance to register.
*/
Kafkaf.EntityManager.prototype.register = function( instance )
{
    // Check if instance isn't already registered.
    for( var i = 0; i < this.listeners.length; i++ )
        if( instance == this.listeners[i] )
            return; 

    // Add instance to the listeners.
    this.listeners[this.listeners.length] = instance;
};
