fs = require('fs')
x = require('xml2js').parseString

systems = []
path = "../systems/";

function read(file){
  fs = require('fs');
	content = fs.readFileSync(path+file,{encoding:'utf8'});
	return content;
}

function parse(xml){
  x = require('xml2js').parseString
	x(xml, function(e,res){
		console.log(res);
    if(res!=null)
			systems.push(res);
	});
}

xml = read("WASP-60.xml")
parse(xml)
console.log(systems)

