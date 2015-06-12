'use strict';

/**
* Create a physic element from a source.
* @constructor
*/
Kafkaf.PhysicLoader = function()
{

}

/**
* Types of physic body.
*/
Kafkaf.PhysicLoader.BodyType = { Static: 0, Dynamic: 1, Kinematic: 2 };

/**
* Types of shape.
*/
Kafkaf.PhysicLoader.ShapeType = { Circle: 0, Box: 1, Polygon: 2 };

/**
* Compute physic instance (Box2D) from JSON data.
* @param entity An Entity instance to fill with data.
* @param data A String using JSON format.
* @return True if everything is ok.
*/
Kafkaf.PhysicLoader.loadFromData = function( entity, data )
{
    // Create body.
    var definition = new b2BodyDef();

    // Set type.
    switch(data.type)
    {
        case Kafkaf.PhysicLoader.BodyType.Dynamic:
            definition.set_type(b2_dynamicBody);
            break;
        case Kafkaf.PhysicLoader.BodyType.Kinematic:
            definition.set_type(b2_kinematicBody);
            break;
        default:
            definition.set_type(b2_staticBody);
            break;
    }

    var body = Kafkaf.application.physic.world.CreateBody(definition);

    // Create fixtures.
    for( var i = 0; i < data.fixtures.length; i++ )
    {
        var fixture = new b2FixtureDef();
        fixture.set_density(data.fixtures[i].density);
        fixture.set_friction(data.fixtures[i].friction);
        fixture.set_restitution(data.fixtures[i].restitution);

        if( data.fixtures[i].shape.type == Kafkaf.PhysicLoader.ShapeType.Circle )
        {
            var size = (data.fixtures[i].shape.size * entity.commonData.scale.x * 0.5) - 0.01;

            var shape = new b2CircleShape();
            shape.set_m_radius(size);
            fixture.set_shape(shape);
        }
        else if( data.fixtures[i].shape.type == Kafkaf.PhysicLoader.ShapeType.Box ) 
        {
            var size = {};
            size.x = (data.fixtures[i].shape.size.x * entity.commonData.scale.x * 0.5) - 0.01;
            size.y = (data.fixtures[i].shape.size.y * entity.commonData.scale.y * 0.5) - 0.01;

            var shape = new b2PolygonShape();
            shape.SetAsBox(size.x, size.y);
            fixture.set_shape(shape);
        }   
        else
        {
            var vertices = [];
            for( var j = 0; j < data.fixtures[i].shape.vertices.length; j++ )
                vertices.push( new b2Vec2( data.fixtures[i].shape.vertices[j][0], data.fixtures[i].shape.vertices[j][1] ) );

            fixture.set_shape(createPolygonShape(vertices));
        }

        body.CreateFixture(fixture);
    }

    // Set position.
    var transform = body.GetTransform();
    body.SetTransform( new b2Vec2(entity.commonData.position.x, entity.commonData.position.y), Math.radians(entity.commonData.rotation) );

    // Save Box2D instance.
    entity.physicComponent = body;

    return true;
};