'use strict';

window.onload = function() 
{
    Core.application = new Core.Application( new Kafkaf.Game() );
    if( Core.application.init() )
        Core.application.start();
};