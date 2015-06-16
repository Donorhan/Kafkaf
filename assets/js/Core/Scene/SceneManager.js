'use strict';

/**
* Manage Scene instances.
* @constructor
*/
Core.SceneManager = function()
{
    this.scenes         = [];
    this.activeScene    = null;
    this.waitingScene   = null;
    this.eventType      = Core.SceneManager.EventType.None;
}

/**
* Event Types.
*/
Core.SceneManager.EventType = { Pop: 0, Push: 1, Replace: 2, None: 3 };

/**
* Entry point.
* @param deltaTime A floating value representing the time elapsed since the last update.
*/
Core.SceneManager.prototype.update = function( deltaTime )
{
    // Manage Scenes's events.
    if( this.eventType != Core.SceneManager.EventType.None )
    {
        switch( this.eventType )
        {
            case Core.SceneManager.EventType.Pop:
            {
                // First we unload active scene.
                this.activeScene.onInactivation();
                this.activeScene.onUnload();

                // Now we can remove it and go back to the previous one.
                var previousScene = this.scenes[this.scenes.length - 1];
                this.activeScene  = previousScene;
                this.activeScene.onActivation();
                this.scenes.pop();

                break;
            }
            case Core.SceneManager.EventType.Push:
            {
                // Inactivate current scene.
                if( this.activeScene )
                    this.activeScene.onInactivation();

                // Save and activate new one.
                this.scenes[this.scenes.length] = this.waitingScene;
                this.activeScene                = this.waitingScene;
                this.activeScene.onLoad();
                this.activeScene.onActivation();

                break;
            }
            case Core.SceneManager.EventType.Replace:
            {
                // Inactivate current scene.
                if( this.activeScene )
                {
                    this.activeScene.onInactivation();
                    this.activeScene.onUnload();
                }

                // Save and activate the new one.
                this.activeScene = this.waitingScene;
                this.activeScene.onLoad();
                this.activeScene.onActivation();

                // Replace in memory.
                this.scenes[this.scenes.length - 1] = this.waitingScene;

                break;
            }
            default:
                break;
        }

        this.eventType      = Core.SceneManager.EventType.None;
        this.waitingScene   = null;
    }

    // Update active scene.
    if( this.activeScene )
        this.activeScene.update(deltaTime);
};

/**
* Go back to the previous scene.
* @return True if everything is ok.
*/
Core.SceneManager.prototype.popScene = function( scene )
{
    if( this.scenes.length < 2 )
        return false;

    this.eventType      = Core.SceneManager.EventType.Pop;
    this.waitingScene   = scene;

    return true;
};

/**
* Push a Scene.
* The pushed Scene become the active one.
* @param scene A Scene instance.
*/
Core.SceneManager.prototype.pushScene = function( scene )
{
    this.eventType      = Core.SceneManager.EventType.Push;
    this.waitingScene   = scene;
};

/**
* Replace the active scene by a new one.
* @param scene A Scene instance.
*/
Core.SceneManager.prototype.replaceScene = function( scene )
{
    if( this.scenes.length == 0 )
    {
        this.pushScene(scene);
        return;
    }

    this.eventType      = Core.SceneManager.EventType.Replace;
    this.waitingScene   = scene;
};

/**
* Get active scene.
* @return A Scene instance or null.
*/
Core.Graphic.prototype.getActiveScene = function()
{
    return this.activeScene;
};
