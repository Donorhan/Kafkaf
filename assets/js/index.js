'use strict';

window.onload = function() 
{
    Core.application = new Core.Application();
    if( Core.application.init() )
        Core.application.start();
};