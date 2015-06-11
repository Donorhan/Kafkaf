/**
* Manage game's logic.
* @constructor
*/
function Game()
{
    this.entityManager = new EntityManager();
}

/**
* Init.
* @return True if everything is ok.
*/
Game.prototype.init = function()
{
    return true;
};

/**
* Entry point.
* @param deltaTime A floating value representing the time elapsed since the last update.
*/
Game.prototype.update = function( deltaTime )
{
    this.entityManager.update(deltaTime);
};

/**
* Call on an event.
* @param event An Event instance. 
*/
Game.prototype.onEvent = function( event )
{
    switch(event.type)
    {
        case Event.Type.KeyDown:
        {
            switch(event.key)
            {
                case 38: // Up
                    break;
                case 40: // Down
                    break;
                case 37: // Left
                    break;
                case 39: // Right
                    break;
                default:
                    break;
            }
        }
        default:
            break;
    }
};