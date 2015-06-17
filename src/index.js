goog.require('Core.Application');

window.onload = function() 
{
	var application = Core.Application.getInstance();
    if( application.init( new Kafkaf.Game() ) )
        application.start();
};
