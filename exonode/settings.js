global.path = "../systems/";
global.read = function(file){
  fs = require('fs');
	console.log(global.path+file);
	content = fs.readFileSync(global.path+file,{encoding:'utf8'});
	return content;
};
global.parse = function(xml){
  x = require('xml2js').parseString
	x(xml, function(e,res){
		console.log(res);
    if(res!=null){
			systems.push(res);
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
fs.readdir(global.path, function(e,i){
  i.forEach(function(file){
	  console.log("open "+file);
		xml = global.read(file);
		global.parse(xml);
	});
});
