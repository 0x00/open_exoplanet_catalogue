canvas = $("canvas#starscreen")[0];
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-200;

$.get("/systemlist", function(data){
	systems = data;
});
