goog.provide('Kafkaf.Helpers.LevelLoader');
goog.require('Kafkaf.Helpers.EntityBuilder');
goog.require('Kafkaf.Loaders.PhysicBodyLoader');
goog.require('Kafkaf.Loaders.SpriteLoader');
goog.require('Kafkaf.Loaders.TransformLoader');

/**
* Load levels.
* @param {ES.World} world The World instance to fill.
* @constructor
* @interface
*/
Kafkaf.Helpers.LevelLoader = function( world )
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
}

/**
* Init.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Helpers.LevelLoader.prototype.init = function()
{
    // Init loaders.
    this.entityBuilder.registerLoader("PhysicBodyComponent", new Kafkaf.Loaders.PhysicBodyLoader(this.world.getSystem(Kafkaf.PhysicSystem)) );
    this.entityBuilder.registerLoader("SpriteComponent", new Kafkaf.Loaders.SpriteLoader(this.world.getSystem(Kafkaf.RendererSystem)) );
    this.entityBuilder.registerLoader("TransformComponent", new Kafkaf.Loaders.TransformLoader() );

    return true;
};

/**
* Get a reference to the EntityBuilder.
* @return {Kafkaf.Helpers.EntityBuilder} A EntityBuilder instance.
*/
Kafkaf.Helpers.LevelLoader.prototype.getEntityBuilder = function()
{
    return this.entityBuilder;
};

/**
* Load a level from a file.
* @param filePath Path to the file with level's data.
* @param callback Callback.
* @return True if everything is ok.
*/
Kafkaf.Helpers.LevelLoader.prototype.loadFromFile = function( filePath, callback )
{
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
Kafkaf.Helpers.LevelLoader.prototype.loadFromData = function( data )
{
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

        // Load others components.
        this.entityBuilder.buildEntityFromPrefab(entity, entityData.name);
    }

    return true;
};