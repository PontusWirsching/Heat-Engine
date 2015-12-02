
// Main XML object.
engine.xml = {};

engine.xml.load = function(path) {
	var xml = new XMLHttpRequest();
	var out;
	xml.onreadystatechange = function() {
   		if (xml.readyState == 4 && xml.status == 200) {
   			out = xml.responseXML;   			
   			//var test = xmlDoc.getElementsByTagName("map")[0].attributes[1].value;
    	}
	}
	xml.open("GET", path, true);
	xml.send();
}