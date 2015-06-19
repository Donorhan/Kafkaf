goog.provide('Kafkaf.ControllableComponent');

/**
* Add the possibility to the user to control an entity.
* @extends {ES.Component}
* @constructor
*/
Kafkaf.ControllableComponent = function()
{
    ES.Component.call(this);

    /**
    * Link keys to actions.
    * @type {Array.<{action:Kafkaf.ControllableComponent.ControlType, key:number}>}
    */
    this.keyActions = [];

    /**
    * States of the key.
    * @type {Array.<{action:Kafkaf.ControllableComponent.ControlType, key:boolean}>}
    */
    this.keyPressed = [];

    // Init default values.
    for( var i = Kafkaf.ControllableComponent.ControlType.Unknow; i <= Kafkaf.ControllableComponent.ControlType.Right; i++ )
        this.keyPressed[i] = false;
}
ES.Utils.extend(ES.Component, Kafkaf.ControllableComponent);

/**
* Types of controls.
* @enum {number}
*/
Kafkaf.ControllableComponent.ControlType = { Unknow: 0, Up: 1, Down: 2, Left: 3, Right: 4 };

/**
* Set a key to use for a action.
* @param {Kafkaf.ControllableComponent.ControlType} action A ControlType value.
* @param {number} key A key value.
*/
Kafkaf.ControllableComponent.prototype.setKey = function( action, key )
{
    this.keyActions[action] = key;
};

/**
* Convert a key value to an action.
* @param {number} key A number representing keyboard value.
* @return {Kafkaf.ControllableComponent.ControlType} The action.
*/
Kafkaf.ControllableComponent.prototype.convertToAction = function( key )
{
    for( var i = Kafkaf.ControllableComponent.ControlType.Up; i <= Kafkaf.ControllableComponent.ControlType.Right; i++ )
        if( this.keyActions[i] == key )
            return i;

    return Kafkaf.ControllableComponent.ControlType.Unknow;
};