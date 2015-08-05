goog.provide('Kafkaf.Loaders.PhysicBodyLoader');
goog.require('Kafkaf.PhysicBodyComponent');
goog.require('Kafkaf.TransformComponent');

/**
* Convert PhysicBodyComponent data to a PhysicBodyComponent.
* @constructor
* @param {Kafkaf.PhysicSystem} physicSystem A Box2D's world instance.
* @author Donovan ORHAN <dono.orhan@gmail.com>
*/
Kafkaf.Loaders.PhysicBodyLoader = function( physicSystem ) 
{
    /**
    * The physic world.
    * @type {b2World}
    */
    this.physicWorld = physicSystem.physicWorld;
}

/**
* Compute physic instance (Box2D) from JSON data.
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {{type, fixtures}} data A String using JSON format.
* @return {boolean} True if everything is ok.
*/
Kafkaf.Loaders.PhysicBodyLoader.prototype.loadFromData = function( entity, data )
{
    var transformComponent = entity.getComponent(Kafkaf.TransformComponent);

    // Create body.
    var definition = new b2BodyDef();

    // Set type.
    switch(data.type)
    {
        case "dynamic":
            definition.set_type(b2_dynamicBody);
            break;
        case "kinematic":
            definition.set_type(b2_kinematicBody);
            break;
        default:
            definition.set_type(b2_staticBody);
            break;
    }

    var body = this.physicWorld.CreateBody(definition);

    // Link body to the entity.
    body.SetUserData(entity);   // Doesn't work with the emscripten portage …
    body.userData = entity;     // … so we must "hack" like that, dirty I know ….

    // Set fixed rotation.
    body.SetFixedRotation((data.fixedRotation || false));

    // Create fixtures.
    for( var i = 0; i < data.fixtures.length; i++ )
    {
        var fixture = new b2FixtureDef();
        fixture.set_density(data.fixtures[i].density || 1.0);
        fixture.set_friction(data.fixtures[i].friction || 0.1);
        fixture.set_restitution(data.fixtures[i].restitution || 0.2);
        fixture.set_isSensor(data.fixtures[i].sensor || false);

        // Shape stuff.
        {
            var offset = data.fixtures[i].shape.offset || { x : 0, y : 0};
            var angle  = data.fixtures[i].shape.angle  || 0;

            if( data.fixtures[i].shape.type == "circle" )
            {
                var size = (data.fixtures[i].shape.size * transformComponent.scale.x * 0.5) - 0.01;

                var shape = new b2CircleShape();
                shape.set_m_p(new b2Vec2(offset.x, offset.y));
                shape.set_m_radius(size);
                fixture.set_shape(shape);
            }
            else if( data.fixtures[i].shape.type == "box" ) 
            {
                var size = {};
                size.x = (data.fixtures[i].shape.size.x * transformComponent.scale.x * 0.5) - 0.01;
                size.y = (data.fixtures[i].shape.size.y * transformComponent.scale.y * 0.5) - 0.01;

                var shape = new b2PolygonShape();
                shape.SetAsBox(size.x, size.y, new b2Vec2(offset.x, offset.y), angle);
                fixture.set_shape(shape);
            }   
            else
            {
                var vertices = [];
                for( var j = 0; j < data.fixtures[i].shape.vertices.length; j++ )
                    vertices.push( new b2Vec2( data.fixtures[i].shape.vertices[j].x, data.fixtures[i].shape.vertices[j].y ) );

                fixture.set_shape(createPolygonShape(vertices));
            }
        }
        
        // Filters.
        if( data.fixtures[i].filter )  
        {
            fixture.get_filter().set_categoryBits( (data.fixtures[i].filter.category != undefined ) ? data.fixtures[i].filter.category : 0x0001 );
            fixture.get_filter().set_maskBits( (data.fixtures[i].filter.mask != undefined ) ? data.fixtures[i].filter.mask : 0xFFFF );
            fixture.get_filter().set_groupIndex( (data.fixtures[i].filter.group != undefined ) ? data.fixtures[i].filter.group : 0 );
        }

        var resultFixture = body.CreateFixture(fixture);
        resultFixture.userData = data.fixtures[i].name || null; // Hack: set_userData didn't work with strings (Box2D JS bug)
    }

    // Set position.
    body.SetTransform( new b2Vec2(transformComponent.position.x, transformComponent.position.y), transformComponent.rotation * Math.PI / 180 );

    // Save Box2D instance.
    entity.addComponent( new Kafkaf.PhysicBodyComponent(body) );

    return true;
};