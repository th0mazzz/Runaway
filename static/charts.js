//---------------------------------------- Pie Chart ---------------------------------------
var bigdiv = document.getElementById("bigdiv");
var svg1 = document.getElementById("vimage");
var stationId = svg1.getAttribute("station");

//console.log(stationId)

d3.json("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/stations.json").then(function(data) {
    
    for (var x = 0;x < data.stationBeanList.length;x++){
	if (stationId == data.stationBeanList[x].id){
	    console.log(data.stationBeanList[x]);
	    var docks = data.stationBeanList[x].totalDocks;
	    var availableDocks = data.stationBeanList[x].availableDocks;
	    var bikes = data.stationBeanList[x].availableBikes;
	    var stationData = [{"name": "open docks", "number": availableDocks}, {"name": "occupied docks", "number": docks - availableDocks - bikes}, {"name":"available bikes", "number":bikes}];
	    //console.log(stationData);
	}
    }

    var width = 380;
    var height = 380;
    var radius = 140

    var color = d3.scaleOrdinal()
	.domain(stationData)
	.range(["#0066ff","#00cc00","#ff0000"]);

    var pie = d3.pie()
	.value(function(d) {
	    return d.number; })(stationData);

    var arc = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

    var labelArc = d3.arc()
	.outerRadius(radius)
	.innerRadius(radius - 100);

    var svgPie = d3.select("#vimage")
	.append("g")
	.attr("transform", "translate(" + 850 + "," + 200 +")");

    var arcy = svgPie.selectAll("arc")
	.data(pie)
	.enter().append("g")
	.attr("class", "arc");

    arcy.append("path")
	.attr("d", arc)
	.style("fill", function(d) {
	    //console.log(d);
	    return color(d.data.name);
	});

    arcy.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.text(function(d) { return d.data.number;})
	.style("fill", "#000");


//---------------------------------------- Legend for Pie Chart ---------------------------------------
    
    var pieLegend = d3.select("#pieLegend").append("svg")
        .attr("width", 150).attr("height", 100)
    
    //D3 Vertical Legend//////////////////////////
    var legendElements = pieLegend.selectAll('#pieLegend')
        .data(stationData)
        .enter().append('g')
        .attr("class", "legends3")
        .attr("transform", function (d, i) {
            {
                return "translate(0," + i * 20 + ")"
            }
        })
    
    legendElements.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
	    //console.log(i)
	    return color(i)
        })
    
    legendElements.append('text')
        .attr("x", 20)
        .attr("y", 10)
    //.attr("dy", ".35em")
        .text(function (d, i) {
            return d.name
        })
        .attr("class", "textselected")
        .style("text-anchor", "start")
        .style("font-size", 15)
});


//---------------------------------------- something  ---------------------------------------


var bikecsv = d3.csv("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/201503-citibike-tripdata.csv").then(function(data){
    console.log(data)
});
