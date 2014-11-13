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


global.bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0};


var parse = function(xml){
  x = require('xml2js').parseString
	x(xml, function(e,res){
		console.log(res);
    if(res!=null){
  
	    if(res.system.rightascension==null || res.system.declination==null)
				return;

      for(var i=0; i<res.system.rightascension.length; i++){
				res.system.rightascension[i] = parseFloat(res.system.rightascension[i].replace(/ /g,""))/1000.;

				if(bounds.minX>res.system.rightascension[i]){
				  bounds.minX = res.system.rightascension[i];
				}
				if(bounds.maxX<res.system.rightascension[i]){
				  bounds.maxX = res.system.rightascension[i];
				}

			}
			
			for(var i=0; i<res.system.declination.length; i++){
				res.system.declination[i] = parseFloat(res.system.declination[i].replace(/ /g,""))/1000.;
				if(bounds.minY>res.system.declination[i]){
				  bounds.minY = res.system.declination[i];
				}
				if(bounds.maxY<res.system.declination[i]){
				  bounds.maxY = res.system.declination[i];
				}

			}


			systems.push(res);
			global.systemMap[encodeURI(res.system.name[0])] = res;
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
buildDB(path2);


function num(a){
  if(!isNaN(a)) return a;

	if(a!=null) return a[0]['_'];
  return 0;	
}

var byDistance = function(a,b){ 
	return num(a.system.distance)-num(b.system.distance)
};


global.byDistance = function(){
	return global.systems.sort(byDistance);
};


repl = require("repl")
r = repl.start("node> ")
