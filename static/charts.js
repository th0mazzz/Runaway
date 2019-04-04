var svg1 = document.getElementById("vimage");
var stationId = svg1.getAttribute("station");

//console.log(stationId)

d3.json("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/stations.json").then(function(data) {
    
    for (var x = 0;x < data.stationBeanList.length;x++){
	if (stationId == data.stationBeanList[x].id){
	    console.log(data.stationBeanList[x]);
	    var docks = data.stationBeanList[x].totalDocks;
	    var availableDocks = data.stationBeanList[x].availableDocks;
	    //var bikes = data.stationBeanList[x].availableBikes;
	    var stationData = [{"name": "available", "number": availableDocks}, {"name": "occupied", "number": docks - availableDocks}];
	    console.log(stationData);
	}
    }

    var width = 400;
    var height = 400;
    var radius = 150

    var color = d3.scaleOrdinal()
	.domain(stationData)
	.range(["#ff0000","#00cc00"]);

    var pie = d3.pie()
	.value(function(d) {
	    return d.number; })(stationData);

    var arc = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

    var labelArc = d3.arc()
	.outerRadius(radius)
	.innerRadius(radius - 50);

    var svg = d3.select("#pie")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width/2 + "," + height/2 +")");

    var g = svg.selectAll("arc")
	.data(pie)
	.enter().append("g")
	.attr("class", "arc");

    g.append("path")
	.attr("d", arc)
	.style("fill", function(d) {
	    //console.log(d);
	    return color(d.data.name);
	});

    g.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.text(function(d) { return d.data.number + ' ' + d.data.name;})
	.style("fill", "#000");
    
});
