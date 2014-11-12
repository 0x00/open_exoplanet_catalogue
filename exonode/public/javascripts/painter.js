canvas = $("canvas#starscreen")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

bounds = JSON.parse($("canvas").attr("bounds"));

function x(sys){
  off =  bounds.maxX-bounds.minX;
	xmap = -bounds.minX+sys.system.rightascension[0];
	return xmap/off;
}

function y(sys){
  off = bounds.maxY-bounds.minY;
	ymap = -bounds.minY+sys.system.declination[0];
	return ymap/off;
}

cx = canvas.getContext('2d');
cx.fillStyle = "#fff";

$.get("/systemlist", function(data){
	systems = data;
	for(var i=0; i<systems.length; i++){
		cur = systems[i];
		console.log(cur.system.name[0]+" "+x(cur)+" "+y(cur));
		cx.fillRect(x(cur)*canvas.width,y(cur)*canvas.height,2,2);
		//cx.fillText(cur.system.name[0],x(cur)*canvas.width+10, y(cur)*canvas.height+4);
	}
});


