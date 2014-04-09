exports.draw = function(req, res){

	byDistance();
  maxDistance = systems[0].system['distance'];

  byDeclination();
  maxDeclination = systems[0].system['declination'];
  minDeclination = systems[systems.length-1].system['declination'];

	byRightascension();
	maxRightascension = systems[0].system['rightascension'];
	minRightascension = systems[systems.length-1].system['rightascension'];

  console.log("maximum distance:"+maxDistance+" dec:"+minDeclination+","+maxDeclination+" right:"+minRightascension+","+maxRightascension);

  res.render('draw', { systems: global.systems });
};
