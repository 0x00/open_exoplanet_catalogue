canvas = $("canvas#starscreen")[0];
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-200;

$.get("/systemlist", function(data){
	systems = data;
	for(var i=0; i<systems.length; i++){
		cur = systems[i];
		console.log(cur.system.name[0]);
	}
});
