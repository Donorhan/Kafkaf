'use strict';

/**
* Load a set of entities.
* @constructor
*/
Kafkaf.EntityLoader = function()
{

}

/**
* Load a catalog from a file.
* @param filePath Path to file with entities's data.
* @param callback Callback.
* @return True if everything is ok.
*/
Kafkaf.EntityLoader.loadFromFile = function( filePath, callback )
{
    loadJSON( filePath, function( JSONData )
    {
        callback( Kafkaf.EntityLoader.loadFromData(JSONData) );
    })

    return true;
};

/**
* Load a level from JSON data.
* @param data Level's data (JSON format).
* @return True if everything is ok.
*/
Kafkaf.EntityLoader.loadFromData = function( data )
{
    var entities = data.entities;

    // Load entities.
    for( var i = 0; i < entities.length; i++ )
    {
        var entityData = {};

        // Graphic component.
        entityData.graphic = {};
        {
            entityData.graphic.textureName = entities[i].graphic.texture;
        }

        // Physic component.
        entityData.physic = {};
        {
            // Type.            
            if( entities[i].physic.type == "static" )
                entityData.physic.type = Kafkaf.PhysicLoader.BodyType.Static;
            else if( entities[i].physic.type == "dynamic" )
                entityData.physic.type = Kafkaf.PhysicLoader.BodyType.Dynamic;
            else
                entityData.physic.type = Kafkaf.PhysicLoader.BodyType.Kinematic;

            // Fixtures.
            entityData.physic.fixtures = [];
            for( var j = 0; j < entities[i].physic.fixtures.length; j++ )
            {
                var fixtureData = entities[i].physic.fixtures[j];

                var fixture         = {};
                fixture.friction    = fixtureData.friction;
                fixture.restitution = fixtureData.restitution;
                fixture.density     = fixtureData.density;
                fixture.shape       = {};
                fixture.shape.type  = Kafkaf.PhysicLoader.ShapeType.Box;
                fixture.shape.size  = { x : fixtureData.shape.size.x, y : fixtureData.shape.size.y };

                entityData.physic.fixtures[j] = fixture;
            }
        }

        // Save it.
        Kafkaf.EntityBuilder.builders[entities[i].main.name] = entityData;
    }

    return true;
};