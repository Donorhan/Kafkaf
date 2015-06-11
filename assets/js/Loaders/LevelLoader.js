/**
* Load a level.
* @constructor
*/
function LevelLoader()
{

}

/**
* Load a level from a file.
* @param filePath Path to the file with level's data.
* @param entityManager EntityManager instance.
* @param callback Callback.
* @return True if everything is ok.
*/
LevelLoader.loadFromFile = function( filePath, entityManager, callback )
{
	loadJSON( filePath, function( JSONData )
	{
		callback( LevelLoader.loadFromData( JSONData, entityManager ) );
	})

    return true;
};

/**
* Load a level from JSON data.
* @param data Level's data (JSON format).
* @param entityManager EntityManager instance.
* @return True if everything is ok.
*/
LevelLoader.loadFromData = function( data, entityManager )
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

        EntityBuilder.buildFromName(entity, entities[i].name);
	}

    return true;
};