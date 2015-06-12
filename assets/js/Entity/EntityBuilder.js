'use strict';

/**
* Create a list of predefined entities.
* @constructor
*/
Kafkaf.EntityBuilder = function()
{

}

/**
* Builders instances.
*/
Kafkaf.EntityBuilder.builders = [];

/**
* Build a new entity using his name.
* @param entity An Entity instance to fill with data.
* @param name Name of the entity pattern.
* @return True if everything is ok.
*/
Kafkaf.EntityBuilder.buildFromName = function( entity, name )
{
    // Search builder.
    var source = null;
    for( var builder in Kafkaf.EntityBuilder.builders )
    {
        if( builder == name )
        {
            source = Kafkaf.EntityBuilder.builders[builder];
            break;
        }
    }

    // Not found? Can't build the entity.
    if( !source )
        return false;

    return Kafkaf.EntityBuilder.buildFromData(entity, source);
};

/**
* Build a new entity using the given data.
* @param entity An Entity instance to fill with data.
* @param data A string representing entity's data (JSON format).
* @return True if everything is ok.
*/
Kafkaf.EntityBuilder.buildFromData = function( entity, data )
{
    if( data.transform )
    {
        entity.commonData.name      = data.transform.name       || null;
        entity.commonData.position  = data.transform.position   || { x : 0, y : 0 };
        entity.commonData.scale     = data.transform.scale      || { x : 1, y : 1 };
        entity.commonData.rotation  = data.transform.rotation   || 0;
    }

    if( data.graphic )
        Kafkaf.GraphicLoader.loadFromData( entity, data.graphic );

    if( data.physic )
        Kafkaf.PhysicLoader.loadFromData( entity, data.physic );

    return true;
};
