/*
var = Libc {
   lib: java.com.sun.jna.NativeLibrary.getInstance('c');
};

Libc.printf("Hello %s, from printf", "World")
*/

var console  = require('vertx/console');

console.log('Launching dcs_tester');

var container = require('vertx/container');

//container.deployVerticle('dcs/dcs_tester.js');

container.deployVerticle('dcs_tester.js');


/*
var cLib;
var getCLib = function() {
	var jna = Packages.com.sun.jna;
	cLib = jna.NativeLibrary.getInstance( jna.Platform.isWindows() ? "msvcrt" : "c");
	getCLib = function () {
		return cLib;
	};
	return cLib;
}

var d2xx;

var getD2xx = function() {
	var jna = Packages.com.sun.jna;
	d2xx = jna.NativeLibrary.getInstance("ftd2xx");
	getD2xx = function() {
		return d2xx;
	};
	return d2xx;
}


var test = function () {
	var jna = Packages.com.sun.jna;
	var hello = String("Hello");
	var puts = getCLib().getFunction("puts").invokeInt([hello]);
};


var test2 = function () {
	var jna = Packages.com.sun.jna;
	var FT_Open = getD2xx().getFunction("FT_Open");

	var devNumber = 0;
	var pftHandle = jna.Memory(4);
	var status = FT_Open.invokeInt([devNumber, pftHandle]);

	console.log('Status : ');
	console.log(status);
}


test();
test2();

*/
