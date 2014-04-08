path1 = "../systems/";
path2 = "../systems_kepler/";

global.systemMap = {};

global.read = function(file){
  fs = require('fs');
	console.log(file);
	content = fs.readFileSync(file,{encoding:'utf8'});
	return content;
};
global.parse = function(xml){
  x = require('xml2js').parseString
	x(xml, function(e,res){
		console.log(res);
    if(res!=null){
			systems.push(res);
			global.systemMap[res.system.name] = res;
			}
	});
};
global.parsecall = function(xml,callback){
  x = require('xml2js').parseString
	x(xml, function(e,res){
		console.log(res);
		callback(res);
	});
};
global.systems = []

fs = require('fs');

function read(path){
fs.readdir(path, function(e,i){
  i.forEach(function(file){
	  console.log("open "+file);
		xml = global.read(path+file);
		global.parse(xml);
	});
});
}

read(path1);
//read(path2);
