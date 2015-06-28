goog.provide('Kafkaf.Models.Level');
goog.require('Kafkaf.Helpers.EntityBuilder');
goog.require('Kafkaf.Loaders.AILoader');
goog.require('Kafkaf.Loaders.CollisionListenerLoader');
goog.require('Kafkaf.Loaders.PhysicBodyLoader');
goog.require('Kafkaf.Loaders.SpriteLoader');
goog.require('Kafkaf.TransformComponent');

/**
* Load levels.
* @param {ES.World} world The World instance to fill.
* @constructor
* @interface
*/
Kafkaf.Models.Level = function( world )
{
    /**
    * The world instance: entities/components and systems management.
    * @type {ES.World}
    * @private
    */
    this.world = world;

    /**
    * Manage file loading.
    * @type {Kafkaf.Helpers.EntityBuilder}
    * @private
    */
    this.entityBuilder = new Kafkaf.Helpers.EntityBuilder();

    /**
    * Indicate if a level is ready to be played.
    * @type {boolean}
    * @private
    */
    this.ready = false;
}

/**
* Init.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Models.Level.prototype.init = function()
{
    this.entityBuilder.registerLoader("AIComponent", new Kafkaf.Loaders.AILoader(this.world.getSystem(Kafkaf.AISystem)) );
    this.entityBuilder.registerLoader("CollisionListenerComponent", new Kafkaf.Loaders.CollisionListenerLoader(this.world.getSystem(Kafkaf.PhysicSystem)) );
    this.entityBuilder.registerLoader("PhysicBodyComponent", new Kafkaf.Loaders.PhysicBodyLoader(this.world.getSystem(Kafkaf.PhysicSystem)) );
    this.entityBuilder.registerLoader("SpriteComponent", new Kafkaf.Loaders.SpriteLoader(this.world.getSystem(Kafkaf.RendererSystem)) );

    return true;
};

/**
* Get a reference to the EntityBuilder.
* @return {Kafkaf.Helpers.EntityBuilder} A EntityBuilder instance.
*/
Kafkaf.Models.Level.prototype.getEntityBuilder = function()
{
    return this.entityBuilder;
};

/**
* Load a level from a file.
* @param filePath Path to the file with level's data.
* @param callback Callback.
* @return True if everything is ok.
*/
Kafkaf.Models.Level.prototype.loadFromFile = function( filePath, callback )
{
    // Ensure the game can't do action when a level is loading.
    this.ready = false;

    // Load file.
    var _this = this;
    loadJSON( filePath, function( JSONData )
    {
        callback( _this.loadFromData( JSONData ) );
    })

    return true;
};

/**
* Load a level from JSON data.
* @param {string} data Level's data (JSON format).
* @return {boolean} True if everything is ok.
*/
Kafkaf.Models.Level.prototype.loadFromData = function( data )
{
    // Ensure world is empty.
    this.world.removeEntities();
    this.ready          = false;

    // Load entities.
    for( var i = 0; i < data.entities.length; i++ )
    {
        var entityData  = data.entities[i];
        var entity      = this.world.createEntity();

        // Create by default a TransformComponent.
        var transformComponent = new Kafkaf.TransformComponent();
        {
            if( entityData.position )
            {
                transformComponent.position.x   = entityData.position.x;
                transformComponent.position.y   = entityData.position.y;
            }

            if( entityData.scale )
            {
                transformComponent.scale.x      = entityData.scale.x;
                transformComponent.scale.y      = entityData.scale.y;
            }

            if( entityData.rotation )
                transformComponent.rotation     = entityData.rotation;
        }
        entity.addComponent(transformComponent);

        // Set name.
        if( entityData.name )
            entity.setName(entityData.name);

        // Load others components.
        this.entityBuilder.buildEntityFromPrefab(entity, entityData.prefab);
    }

    this.ready = true;
    return true;
};

/**
* Useful to know if the level is loaded.
* @return {boolean} True if the level is in memory.
*/
Kafkaf.Models.Level.prototype.isLoaded = function()
{
    return this.ready;
};
