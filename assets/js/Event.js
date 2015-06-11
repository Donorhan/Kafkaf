function Event()
{
    this.type   = 0;
    this.x      = 0;
    this.y      = 0;
    this.key    = null;
}

/**
* Event Types.
*/
Event.Type = { MouseDown: 0, MouseUp: 1, MouseMove: 2, KeyDown: 3, KeyUp: 4, WindowResize: 5 };

/**
* Mouse events
* @param event Event's data.
*/
document.onmousemove = function( event ) 
{
    var eventData   = new Event();
    eventData.type  = Event.Type.MouseMove;
    eventData.x     = event.x;
    eventData.y     = event.y;
    application.onEvent(eventData);
};

/**
* Mouse events: Click down event.
* @param event Event's data.
*/
document.onmousedown = function( event ) 
{
    var eventData   = new Event();
    eventData.type  = Event.Type.MouseDown;
    eventData.x     = event.x;
    eventData.y     = event.y;
    application.onEvent(eventData);
};

/**
* Mouse events: Click up event.
* @param event Event's data.
*/
document.onmouseup = function( event ) 
{
    var eventData       = new Event();
    eventData.type      = Event.Type.MouseUp;
    eventData.x         = event.x;
    eventData.y         = event.y;
    application.onEvent(eventData);
};

/**
* Keyboard events: Key down.
* @param event Event's data.
*/
document.onkeydown = function( event ) 
{
    var eventData   = new Event();
    eventData.type  = Event.Type.KeyDown;
    eventData.key   = event.keyCode;
    application.onEvent(eventData);
};

/**
* Keyboard events: Key up.
* @param event Event's data.
*/
document.onkeyup = function( event ) 
{
    var eventData   = new Event();
    eventData.type  = Event.Type.KeyUp;
    eventData.key   = event.keyCode;
    application.onEvent(eventData);
};

/**
* Window events: Resize.
* @param event Event's data.
*/
window.onresize = function( event ) 
{
    var eventData   = new Event();
    eventData.type  = Event.Type.WindowResize;
    eventData.x     = window.innerWidth;
    eventData.y     = window.innerHeigh;
    application.onEvent(eventData);
};