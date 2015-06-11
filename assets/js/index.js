var application = null;

window.onload = function() 
{
    application = new Application();
    if( application.init() )
        application.start();
};
