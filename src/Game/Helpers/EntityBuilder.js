goog.provide('Kafkaf.Helpers.EntityBuilder');

/**
* Build entities.
* @constructor
*/
Kafkaf.Helpers.EntityBuilder = function() 
{
    /**
    * Array of Loader.
    * @type {Array.<string, Object>}
    */
    this.loaders = [];

    /**
    * Array of string.
    * @type {Array.<string, Array.<string, string>>}
    */
    this.prefabs = [];
}

/**
* Register a loader.
* @param {string} name Loader's name.
* @param {Object} instance A Loader instance.
*/
Kafkaf.Helpers.EntityBuilder.prototype.registerLoader = function( name, instance )
{
    this.loaders[name] = instance;
}

/**
* Load prebafs from a file.
* @param {string} filePath Path to file with entities's data.
* @param {function} callback Callback.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Helpers.EntityBuilder.prototype.loadPrefabsFromFile = function( filePath, callback )
{
	var _this = this;
    loadJSON( filePath, function( JSONData )
    {
        callback( _this.loadPrefabsFromData(JSONData) );
    })

    return true;
};

/**
* Load prefabs from JSON data.
* @param {string} data Level's data (JSON format).
* @return {boolean} True if everything is ok.
*/
Kafkaf.Helpers.EntityBuilder.prototype.loadPrefabsFromData = function( data )
{
	var prefabs = data.prefabs;
    for( var i = 0; i < prefabs.length; i++ )
    {
    	var keys = Object.keys(prefabs[i]);

    	var data = [];
    	for( var j = 0; j < keys.length; j++ )
    		data[keys[j]] = prefabs[i][keys[j]];

		this.prefabs[prefabs[i].main.name] = data;
    }

    return true;
};

/**
* Build a new entity using his name.
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {string} prefabName Name of the prefab to use.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Helpers.EntityBuilder.prototype.buildEntityFromPrefab = function( entity, prefabName )
{
    // Search builder.
    var source = this.prefabs[prefabName];
    if( !source )
        return false;

    return this.buildEntityFromData(entity, source);
};

/**
* Build a new entity using the given data.
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {string} data A string representing entity's data (JSON format).
* @return {boolean} True if everything is ok.
*/
Kafkaf.Helpers.EntityBuilder.prototype.buildEntityFromData = function( entity, data )
{
    for( var i in data )
    {
        var loader = this.loaders[i];
        if( loader )
            loader.loadFromData(entity, data[i]);
    }

    return true;
};
