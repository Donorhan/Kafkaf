goog.provide('Core.Event');
goog.require('Core.Application');

/**
* Convert DOM events to game events.
* @constructor
*/
Core.Event = function()
{
    /**
    * Event's type.
    * @type {Core.Event.Type}
    */
    this.type = Core.Event.Type.Unknow;

    /**
    * Event's position on X.
    * @type {number}
    */
    this.x = 0;

    /**
    * Event's position on Y.
    * @type {number}
    */
    this.y = 0;

    /**
    * Event's key: usefull to know more about keyboard events.
    * @type {number|null}
    */
    this.key = null;
}

/**
* Event Types.
* @enum {number}
*/
Core.Event.Type = { MouseDown: 0, MouseUp: 1, MouseMove: 2, KeyDown: 3, KeyUp: 4, WindowResize: 5, Unknow: 6 };

/**
* Mouse events
* @param {HTMLElement} event Event's data.
*/
document.onmousemove = function( event ) 
{
    var eventData   = new Core.Event();
    eventData.type  = Core.Event.Type.MouseMove;
    eventData.x     = event.x;
    eventData.y     = event.y;

    if( Core.Application.getInstance() )
        Core.Application.getInstance().onEvent(eventData);
};

/**
* Mouse events: Click down event.
* @param {HTMLElement} event Event's data.
*/
document.onmousedown = function( event ) 
{
    var eventData   = new Core.Event();
    eventData.type  = Core.Event.Type.MouseDown;
    eventData.x     = event.x;
    eventData.y     = event.y;

    if( Core.Application.getInstance() )
        Core.Application.getInstance().onEvent(eventData);
};

/**
* Mouse events: Click up event.
* @param {HTMLElement} event Event's data.
*/
document.onmouseup = function( event ) 
{
    var eventData       = new Core.Event();
    eventData.type      = Core.Event.Type.MouseUp;
    eventData.x         = event.x;
    eventData.y         = event.y;

    if( Core.Application.getInstance() )
        Core.Application.getInstance().onEvent(eventData);
};

/**
* Keyboard events: Key down.
* @param {HTMLElement} event Event's data.
*/
document.onkeydown = function( event ) 
{
    var eventData   = new Core.Event();
    eventData.type  = Core.Event.Type.KeyDown;
    eventData.key   = event.keyCode;

    if( Core.Application.getInstance() )
        Core.Application.getInstance().onEvent(eventData);
};

/**
* Keyboard events: Key up.
* @param {HTMLElement} event Event's data.
*/
document.onkeyup = function( event ) 
{
    var eventData   = new Core.Event();
    eventData.type  = Core.Event.Type.KeyUp;
    eventData.key   = event.keyCode;

    if( Core.Application.getInstance() )
        Core.Application.getInstance().onEvent(eventData);
};

/**
* Window events: Resize.
* @param {HTMLElement} event Event's data.
*/
window.onresize = function( event ) 
{
    var eventData   = new Core.Event();
    eventData.type  = Core.Event.Type.WindowResize;
    eventData.x     = window.innerWidth;
    eventData.y     = window.innerHeight;

    if( Core.Application.getInstance() )
        Core.Application.getInstance().onEvent(eventData);
};
