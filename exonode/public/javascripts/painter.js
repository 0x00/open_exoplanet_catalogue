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

function mass(sys){
  try{
		var m = parseFloat(sys.system.star[0].mass[0]);
		if(!isNaN(m)) return m;
	}catch(e){
	
	}
	return 1.0;
}

var systems = [];

function paint(system, cx){
	px= x(cur)*canvas.width;
	py= y(cur)*canvas.height;

	//console.log(cur.system.name[0]+" "+px+" "+py);
  cx.beginPath();
	cx.arc(px,py,1+mass(system),0,2*Math.PI);
	cx.fill();

	//cx.fillText(cur.system.name[0],x(cur)*canvas.width+10, y(cur)*canvas.height+4);
}

function paintSystems(systems,cx){

	var grd=cx.createLinearGradient(0,0,0,canvas.height);
	grd.addColorStop(0,"#002");
	grd.addColorStop(1,"#005");

	cx.fillStyle = grd;
  cx.fillRect(0,0,canvas.width, canvas.height);


	cx.fillStyle = "#fff";
	cx.strokeStyle = "#fff";

	for(var i=0; i<systems.length; i++){
		cur = systems[i];
		paint(cur, cx);
	}


}

function draw(){

bounds = JSON.parse($("canvas").attr("bounds"));

canvas = $("canvas#starscreen")[0];
$("#info").css("height",window.innerHeight+"px");
canvas.width = window.innerWidth-parseInt($("#info").css("width"))-30;
canvas.height = window.innerHeight;
$(canvas).css("height", window.innerHeight+"px");

cx = canvas.getContext('2d');

function get(page,max){
  $.get("/systemlist/"+page, function(data){
    systems = systems.concat(data);
    if(page<max){
		  page++;
			get(page,max);

			paintSystems(systems,cx);

      cx.font = "60px Arial";
      cx.fillStyle = "#000";
	    cx.fillText("Wait while loading..", 100+3,100+3);
      cx.fillStyle = "#9f9";
	    cx.fillText("Wait while loading..", 100,100);
		}else{
			paintSystems(systems,cx);
		}
		
	});

}

if(systems.length==0){
  get(0,bounds.pages);
}else
 paintSystems(systems, cx);
};

window.onresize = draw;
draw();



point = {x: 0, y: 0};

function byClick(a,b){
  Apx= x(a)*canvas.width;
	Apy= y(a)*canvas.height;

  Bpx= x(b)*canvas.width;
	Bpy= y(b)*canvas.height;

  d = Math.sqrt(Math.pow(Apx-point.x,2) + Math.pow(Apy-point.y,2));
  d2 = Math.sqrt(Math.pow(Bpx-point.x,2) + Math.pow(Bpy-point.y,2));

	return d-d2; 

}




$(canvas).on('click', function(e){
  var clx = e.pageX;
  var cly = e.pageY;
	point.x = clx;
	point.y = cly;
  systems.sort(byClick);
  sys = systems[0];

  cx.strokeStyle = "#9f9";
  sx = x(sys)*canvas.width;
  sy = y(sys)*canvas.height;
  cx.rect(sx-3,sy-3, +6, +6);
  cx.stroke();

	cx.font = "14px Arial";
	cx.fillStyle = "#333";
	cx.fillText(sys.system.name[0], sx+10, sy+4);
	cx.fillStyle = "#fff";
	cx.fillText(sys.system.name[0], sx+10-2, sy+4-2);


	$.get("/system/"+sys.system.name[0]+".htm?ajax=yo", function(data){
    $("#info #moreinfo").html(data);
	});

});


$("#starscreen").bind('oanimationend animationend webkitAnimationEnd transitionend', function() { 
		 draw();
     $(".zoom1").removeClass("zoom2");
});



function align(e){

  var clx = e.clientX;
  var cly = e.clientY;


  if(typeof e.originalEvent.touches != 'undefined'){
	  var t = e.originalEvent.touches;
	  clx = t[0].pageX;
	  cly = t[0].pageY;
	}


  $(".zoom1").addClass("zoom2");

   cx.strokeStyle = "#f99";

	size = 190;
	left = { x: clx-size, y: cly-size};
  point = left;
  systems.sort(byClick);
  left.system = systems[0].system;

	right = { x: clx+size, y: cly+size};
  point = right;
	systems.sort(byClick);
  right.system = systems[0].system;

  bounds.minX = left.system.rightascension[0];
	bounds.maxX = right.system.rightascension[0];

	bounds.minY = left.system.declination[0];
	bounds.maxY = right.system.declination[0];

  $("canvas").attr("bounds",JSON.stringify(bounds));


	cx.rect(left.x, left.y, size*2, size*2);
	cx.stroke();

  //draw();

}


var tapped=false
$(canvas).on("touchstart",function(e){
    if(!tapped){ 
      tapped=setTimeout(function(){
          tapped=null
      },300);   
    } else {    
      clearTimeout(tapped);
      tapped=null;

			align(e);
    }
});

$(canvas).on('dblclick', align);
