goog.provide('Core.SceneManager');
goog.require('Core.Scene');

/**
* Manage Scene instances.
* @constructor
*/
Core.SceneManager = function()
{
    /**
    * Scenes availables.
    * @type {Array.<Core.Scene>}
    */
    this.scenes = [];

    /**
    * Active scene, can be null.
    * @type {Core.Scene|null}
    */
    this.activeScene = null;

    /**
    * Scene waiting to be pushed.
    * @type {Core.Scene|null}
    */
    this.waitingScene = null;

    /**
    * Type of event waiting to be processed.
    * @type {Core.SceneManager.EventType}
    */
    this.eventType = Core.SceneManager.EventType.None;
}

/**
* Event Types.
* @enum {number}
*/
Core.SceneManager.EventType = { Pop: 0, Push: 1, Replace: 2, None: 3 };

/**
* Logic's entry point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
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
* Rendering entry's point.
* @param {number} deltaTime A floating value representing the time elapsed since the last update.
*/
Core.SceneManager.prototype.render = function( deltaTime ) 
{
    if( this.activeScene )
        this.activeScene.render(deltaTime);    
};

/**
* Go back to the previous scene.
* @return {boolean} True if everything is ok.
*/
Core.SceneManager.prototype.popScene = function()
{
    if( this.scenes.length < 2 )
        return false;

    this.eventType = Core.SceneManager.EventType.Pop;

    return true;
};

/**
* Push a Scene.
* Note: The pushed Scene become the active one.
*
* @param {Core.Scene} scene A Scene instance.
*/
Core.SceneManager.prototype.pushScene = function( scene )
{
    this.eventType      = Core.SceneManager.EventType.Push;
    this.waitingScene   = scene;
};

/**
* Replace the active scene by a new one.
* @param {Core.Scene} scene A Scene instance.
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
* @return {Core.Scene|null} A Scene instance or null.
*/
Core.SceneManager.prototype.getActiveScene = function()
{
    return this.activeScene;
};
