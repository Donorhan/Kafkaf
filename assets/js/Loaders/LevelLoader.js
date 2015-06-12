'use strict';

/**
* Load a level.
* @constructor
*/
Kafkaf.LevelLoader = function()
{

}

/**
* Load a level from a file.
* @param filePath Path to the file with level's data.
* @param entityManager EntityManager instance.
* @param callback Callback.
* @return True if everything is ok.
*/
Kafkaf.LevelLoader.loadFromFile = function( filePath, entityManager, callback )
{
	loadJSON( filePath, function( JSONData )
	{
		callback( Kafkaf.LevelLoader.loadFromData( JSONData, entityManager ) );
	})

    return true;
};

/**
* Load a level from JSON data.
* @param data Level's data (JSON format).
* @param entityManager EntityManager instance.
* @return True if everything is ok.
*/
Kafkaf.LevelLoader.loadFromData = function( data, entityManager )
{
	var entities = data.entities;

	// Load entities.
	for( var i = 0; i < entities.length; i++ )
	{
        var entity = entityManager.createEntity();

        if( entities[i].position )
        {
        	entity.commonData.position.x = entities[i].position.x;
        	entity.commonData.position.y = entities[i].position.y;
        }

        if( entities[i].scale )
        {
        	entity.commonData.scale.x = entities[i].scale.x;
        	entity.commonData.scale.y = entities[i].scale.y;
        }

        if( entities[i].rotation )
        	entity.commonData.rotation = entities[i].rotation;

        Kafkaf.EntityBuilder.buildFromName(entity, entities[i].name);
	}

    return true;
};