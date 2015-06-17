goog.provide('Kafkaf.Loaders.PhysicBodyLoader');
goog.require('Kafkaf.PhysicBodyComponent');
goog.require('Kafkaf.TransformComponent');
goog.require('goog.math');

/**
* Convert PhysicBodyComponent data to a PhysicBodyComponent.
* @param {b2World} instance A Box2D's world instance.
* @constructor
*/
Kafkaf.Loaders.PhysicBodyLoader = function( instance ) 
{
    /**
    * The physic world.
    * @type {b2World}
    */
    this.physicWorld = instance.physicWorld;
}

/**
* Compute physic instance (Box2D) from JSON data.
* @param {ES.Entity} entity An Entity instance to fill with data.
* @param {string} data A String using JSON format.
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

    // Create fixtures.
    for( var i = 0; i < data.fixtures.length; i++ )
    {
        var fixture = new b2FixtureDef();
        fixture.set_density(data.fixtures[i].density);
        fixture.set_friction(data.fixtures[i].friction);
        fixture.set_restitution(data.fixtures[i].restitution);
        fixture.set_isSensor(data.fixtures[i].sensor);

        if( data.fixtures[i].shape.type == "circle" )
        {
            var size = (data.fixtures[i].shape.size * transformComponent.scale.x * 0.5) - 0.01;

            var shape = new b2CircleShape();
            shape.set_m_radius(size);
            fixture.set_shape(shape);
        }
        else if( data.fixtures[i].shape.type == "box" ) 
        {
            var size = {};
            size.x = (data.fixtures[i].shape.size.x * transformComponent.scale.x * 0.5) - 0.01;
            size.y = (data.fixtures[i].shape.size.y * transformComponent.scale.y * 0.5) - 0.01;

            var shape = new b2PolygonShape();
            shape.SetAsBox(size.x, size.y);
            fixture.set_shape(shape);
        }   
        else
        {
            var vertices = [];
            for( var j = 0; j < data.fixtures[i].shape.vertices.length; j++ )
                vertices.push( new b2Vec2( data.fixtures[i].shape.vertices[j].x, data.fixtures[i].shape.vertices[j].y ) );

            fixture.set_shape(createPolygonShape(vertices));
        }

        body.CreateFixture(fixture);
    }

    // Set position.
    body.SetTransform( new b2Vec2(transformComponent.position.x, transformComponent.position.y), goog.math.toRadians(transformComponent.rotation) );

    // Save Box2D instance.
    entity.addComponent( new Kafkaf.PhysicBodyComponent(body) );

    return true;
};