path1 = "../systems/";
path2 = "../systems_kepler/";

global.systemMap = {};
global.systems = []

var read = function(file){
  fs = require('fs');
	console.log(file);
	content = fs.readFileSync(file,{encoding:'utf8'});
	return content;
};

var parse = function(xml){
  x = require('xml2js').parseString
	x(xml, function(e,res){
		console.log(res);
    if(res!=null){
			systems.push(res);
			global.systemMap[res.system.name] = res;
			}
	});
};

fs = require('fs');

function buildDB(path){
fs.readdir(path, function(e,i){
  i.forEach(function(file){
	  console.log("open "+file);
		xml = read(path+file);
		parse(xml);
	});
});
}

buildDB(path1);
//buildDB(path2);


function num(a){
  if(!isNaN(a)) return a;

	if(a!=null) return a[0]['_'];
  return 0;	
}

var byDistance = function(a,b){ 
	return num(b.system.distance)-num(a.system.distance)
};
var byDeclination = function(a,b){
  if(a.system.declination!=null){
		d1 = a.system.declination[0].replace(/ /g,"");
	}else d1=0;

	if(b.system.declination!=null){
		d2 = b.system.declination[0].replace(/ /g,"");
	}else d2=0;

	return d2-d1;
};
var byRightascension = function(a,b){
  if(a.system.rightascension!=null){
		d1 = a.system.rightascension[0].replace(/ /g,"");
	}else d1=0;

	if(b.system.rightascension!=null){
		d2 = b.system.rightascension[0].replace(/ /g,"");
	}else d2=0;

	return d2-d1;
};



global.byDistance = function(){
	global.systems.sort(byDistance);
};
global.byDeclination = function(){
  global.systems.sort(byDeclination);
};
global.byRightascension = function(){
	global.systems.sort(byRightascension);
};

repl = require("repl")
r = repl.start("node> ")
