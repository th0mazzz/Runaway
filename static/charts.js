//---------------------------------------- Dock Status Pie Chart ---------------------------------------
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

    var dockStatusWidth = 380;
    var dockStatusHeight = 380;
    var dockStatusRadius = 140
    var dockStatusDisplacementX = 850
    var dockStatusDisplacementY = 200

    var dockStatusColor = d3.scaleOrdinal()
	.domain(stationData)
	.range(["#0066ff","#00cc00","#ff0000"]);

    var dockStatusPie = d3.pie()
	.value(function(d) {
	    return d.number; })(stationData);

    var dockStatusArc = d3.arc()
	.outerRadius(dockStatusRadius - 10)
	.innerRadius(0);

    var dockStatusLabelArc = d3.arc()
	.outerRadius(dockStatusRadius)
	.innerRadius(dockStatusRadius - 100);

    var dockStatusSvgPie = d3.select("#vimage")
	.append("g")
	.attr("transform", "translate(" + dockStatusDisplacementX + "," + dockStatusDisplacementY +")");

    var dockStatusArcy = dockStatusSvgPie.selectAll("arc")
	.data(dockStatusPie)
	.enter().append("g")
	.attr("class", "arc");

    var text = d3.select("#vimage")
    .append("text")
    .attr("x", dockStatusDisplacementX - 50)
    .attr("y", dockStatusDisplacementY - 150)
    .text("Dock Status")
    .style("font-size", 20)
    .style("fill", "white")

    //<text x="800" y="50" font-family="sans-serif" font-size="20px" fill="white">Dock Status!</text>

    dockStatusArcy.append("path")
	.attr("d", dockStatusArc)
	.style("fill", function(d) {
	    //console.log(d);
	    return dockStatusColor(d.data.name);
	});

    dockStatusArcy.append("text")
	.attr("transform", function(d) { return "translate(" + dockStatusLabelArc.centroid(d) + ")"; })
	.text(function(d) { return d.data.number;})
	.style("fill", "#000");


//---------------------------------------- Legend for Dock Status Pie Chart ---------------------------------------

var dockStatusPieLegend = d3.select("#vimage")
.append("g")
.attr("transform", "translate(" + dockStatusDisplacementX + "," + dockStatusDisplacementY +")");

    var legendElements = dockStatusPieLegend.selectAll("#vimage")
    .data(stationData)
    .enter().append('g')
    .attr("class", "dockStatusLegend")
    .attr("transform", function (d, i) {
        {
            return "translate(" + 200 +"," + (i * 20 - 60) + ")"
        }
    });

    legendElements.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
	    //console.log(i)
	    return dockStatusColor(i)
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


//---------------------------------------- Gender pie  ---------------------------------------


var bikecsv = d3.csv("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/201503-citibike-tripdata.csv").then(function(data){
    i = 0;
    var numMale, numFem, numNA = 0
    /*
    while(i < data.length){
        if(data[0]["gender"] == "1"){
            numMale++;
        }
        else{
            if(data[0]["gender"] == "2"){
                numFem++;
            }
            else{
                numNA++;
            }
        }
    }
    */
    console.log(numMale)


});
