goog.provide('Utils');

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
* Load a JSON file.
* @param {string} filePath Path to the file.
* @param {function(Object)} callback Callback.
*/
Utils.loadJSON = function( filePath, callback )
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