'use strict';

/**
* Prepare "requestAnimFrame" function.
*/
window.requestAnimFrame = (function()
{
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

/**
* Convert to radians the given value.
* @param degrees A floating value.
* @return A floating value.
*/
Math.radians = function( degrees ) {
    return degrees * Math.PI / 180.0;
}

/**
* Convert to degrees the given value.
* @param radians A floating value.
* @return A floating value.
*/
Math.degrees = function( radians ) {
    return radians * 180 / Math.PI;
}

/**
* Load a JSON file.
* @param filePath Path to the file.
* @param callback Callback.
*/
function loadJSON( filePath, callback )
{
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', filePath, true);

	xobj.onreadystatechange = function() 
	{
		if (xobj.readyState == 4 && xobj.status == "200")
			callback(JSON.parse(xobj.responseText));
	};
	xobj.send(null);  
}