'use strict';

window.onload = function() 
{
    Kafkaf.application = new Kafkaf.Application();
    if( Kafkaf.application.init() )
        Kafkaf.application.start();
};