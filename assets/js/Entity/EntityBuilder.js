/**
* Create a list of predefined entities.
* @constructor
*/
function EntityBuilder()
{

}

/**
* Builders instances.
*/
EntityBuilder.builders = [];

/**
* Build a new entity using his name.
* @param entity An Entity instance to fill with data.
* @param name Name of the entity pattern.
* @return True if everything is ok.
*/
EntityBuilder.buildFromName = function( entity, name )
{
    // Search builder.
    var source = null;
    for( var builder in EntityBuilder.builders )
    {
        if( builder == name )
        {
            source = EntityBuilder.builders[builder];
            break;
        }
    }

    // Not found? Can't build the entity.
    if( !source )
        return false;

    return EntityBuilder.buildFromData(entity, source);
};

/**
* Build a new entity using the given data.
* @param entity An Entity instance to fill with data.
* @param data A string representing entity's data (JSON format).
* @return True if everything is ok.
*/
EntityBuilder.buildFromData = function( entity, data )
{
    if( data.transform )
    {
        entity.commonData.name      = data.transform.name       || null;
        entity.commonData.position  = data.transform.position   || { x : 0, y : 0};
        entity.commonData.rotation  = data.transform.rotation   || 0;
    }

    if( data.graphic )
        GraphicLoader.loadFromData( entity, data.graphic );

    if( data.physic )
    {
        PhysicLoader.loadFromData( entity, data.physic );

        // Set position.
        var transform = entity.physicComponent.GetTransform();
        entity.physicComponent.SetTransform( new b2Vec2(entity.commonData.position.x, entity.commonData.position.y), Math.radians(entity.commonData.rotation) );
    }

    return true;
};
