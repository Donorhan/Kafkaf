/**
* A simple entity.
* @constructor
*/
function Entity()
{
    // Common data.
    this.commonData = {
        name        : "",
        position    : { x : 0, y : 0},
        scale       : { x : 1, y : 1},
        rotation    : 0
    };

    // Components.
    this.graphicComponent   = null;
    this.physicComponent    = null;
    this.gameComponent      = null;
}