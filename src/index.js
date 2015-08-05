goog.provide('Kafkaf.Main');
goog.require('Core.Application');
goog.require('Kafkaf.Game');

window.onload = function() 
{
    var application = Core.Application.getInstance();
    if( application.init( new Kafkaf.Game() ) )
        application.start();
};
