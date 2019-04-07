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
	    var stationData = [{"name": "Open Docks", "number": availableDocks}, {"name": "Occupied Docks", "number": docks - availableDocks - bikes}, {"name":"Available Bikes", "number":bikes}];
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

//---------------------------------------- age bar -------------------------------------------
var ageCsv = d3.csv("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/201503-citibike-tripdata.csv").then(function(data){
  var i = 0;
  var num10 = [];
  var num20 = [];
  var num30 = [];
  var num40 = [];
  var num50 = [];
  var num60 = [];
  var num70 = [];
  var num80 = [];
  var num90 = [];
  var noAgegiven = [];


  while(i < data.length){
      //console.log(stationId);
      //console.log("years");
      //console.log(data[i]);
      //so parsing the trips at this station
      if(data[i]["start station id"] == stationId.toString() || data[i]["end station id"] == stationId.toString()){
        //ages 0-10
        if(2019 - parseInt(data[i]["birth year"],10) <= 10){
          num10.push(data[i]);
        }
        //ages 11-20
        else if(2019 - parseInt(data[i]["birth year"],10) <= 20){
          num20.push(data[i]);
        }
        //ages 21-30
        else if(2019 - parseInt(data[i]["birth year"],10) <= 30){
          num30.push(data[i]);
        }
        //ages 31-40
        else if(2019 - parseInt(data[i]["birth year"],10) <= 40){
          num40.push(data[i]);
        }
        //ages 41-50
        else if(2019 - parseInt(data[i]["birth year"],10) <= 50){
          num50.push(data[i]);
        }
        //ages 51-60
        else if(2019 - parseInt(data[i]["birth year"],10) <= 60){
          num60.push(data[i]);
        }
        //ages 61-70
        else if(2019 - parseInt(data[i]["birth year"],10) <= 70){
          num70.push(data[i]);
        }
        //ages 71-80
        else if(2019 - parseInt(data[i]["birth year"],10) <= 80){
          num80.push(data[i]);
        }
        //ages 80+
        else if(2019 - parseInt(data[i]["birth year"],10) <= 110){
          num90.push(data[i]);
        }
        //if theres no age given throw em elsewhere
        else{
          noAgegiven.push(data[i]);
        }
      }
      i++;
  }
  //console.log(num10);
  //console.log(num20);
  //console.log(num30);
  //console.log(num40);
  //console.log(num50);
  //console.log(num60);
  //console.log(num70);
  //console.log(num80);
  //console.log(num90);
  //console.log(noAgegiven);

  var ageData = [{"ageGroup": "0-10", "number": num10.length},
                 {"ageGroup": "11-20", "number": num20.length},
                 {"ageGroup": "21-30", "number": num30.length},
                 {"ageGroup": "31-40", "number": num40.length},
                 {"ageGroup": "41-50", "number": num50.length},
                 {"ageGroup": "51-60", "number": num60.length},
                 {"ageGroup": "61-70", "number": num70.length},
                 {"ageGroup": "71-80", "number": num80.length},
                 {"ageGroup": "80+", "number": num90.length},
                 {"ageGroup": "N/A", "number": noAgegiven.length}];
  //console.log(ageData);

  var svg = d3.select("#vimage"),
      width = 400,
      height = 300;

  var x = d3.scaleBand().range([0,width]).padding(0.4).domain(ageData.map(function(d){return d.ageGroup;}));

  var y = d3.scaleLinear().range([height,0]).domain([0,d3.max(ageData,function(d){return d.number;})]);

  var g = svg.append("g")
             .attr("transform", "translate("+ 100 + "," + 800 + ")");

  g.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x))
   .append("text")
   .attr("y", height - 250)
   .attr("x", width - 100)
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("Age Group");

  g.append("g")
   .call(d3.axisLeft(y).tickFormat(function(d){
     return d;
   }).ticks(10))
   .append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy", "-5.1em")
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("People");

   var div = d3.select("body").append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);


  g.selectAll(".bar")
    .data(ageData)
    .enter().append("rect")
    .attr("class","bar")
    .attr("x", function(d){return x(d.ageGroup); })
    .attr("y", function(d){return y(d.number); })
    .attr("width", x.bandwidth())
    .attr("height", function(d){return height - y(d.number); })
    .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(d.number)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
    .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
        });
//------------------------------average trip time per age group-----------------------
  var avNum10 = 0;
  var avNum20 = 0;
  var avNum30 = 0;
  var avNum40 = 0;
  var avNum50 = 0;
  var avNum60 = 0;
  var avNum70 = 0;
  var avNum80 = 0;
  var avNum90 = 0;
  var avNoAgeGiven = 0;
  for (var i = 0;i<num10.length;i++){
    avNum10+=parseInt(num10[i]["tripduration"],10);
  }
  avNum10 = avNum10/num10.length

  for (var i = 0;i<num20.length;i++){
    avNum20+=parseInt(num20[i]["tripduration"],10);
  }
  avNum20 = avNum20/num20.length

  for (var i = 0;i<num30.length;i++){
    avNum30+=parseInt(num30[i]["tripduration"],10);
  }
  avNum30 = avNum30/num30.length

  for (var i = 0;i<num40.length;i++){
    //console.log(num40[i]["tripduration"]);
    avNum40+=parseInt(num40[i]["tripduration"],10);
  }
  //console.log("num40 total");
  //console.log(avNum40);
  //console.log(num40.length);
  avNum40 = avNum40/num40.length
  //console.log(avNum40);
  for (var i = 0;i<num50.length;i++){
    avNum50+=parseInt(num50[i]["tripduration"],10);
  }
  avNum50 = avNum50/num50.length

  for (var i = 0;i<num60.length;i++){
    avNum60+=parseInt(num60[i]["tripduration"],10);
  }
  avNum60 = avNum60/num60.length

  for (var i = 0;i<num70.length;i++){
    avNum70+=parseInt(num70[i]["tripduration"],10);
  }
  avNum70 = avNum70/num70.length

  for (var i = 0;i<num80.length;i++){
    avNum80+=parseInt(num80[i]["tripduration"],10);
  }
  avNum80 = avNum80/num80.length

  for (var i = 0;i<num90.length;i++){
    avNum90+=parseInt(num90[i]["tripduration"],10);
  }
  avNum90 = avNum90/num90.length

  for (var i = 0;i<noAgegiven.length;i++){
    avNoAgeGiven+=parseInt(noAgegiven[i]["tripduration"],10);
  }
  avNoAgeGiven = avNoAgeGiven/noAgegiven.length



  var tripDurationData = [{"ageGroup": "0-10", "number": Math.floor(avNum10)},
                          {"ageGroup": "11-20", "number": Math.floor(avNum20)},
                          {"ageGroup": "21-30", "number": Math.floor(avNum30)},
                          {"ageGroup": "31-40", "number": Math.floor(avNum40)},
                          {"ageGroup": "41-50", "number": Math.floor(avNum50)},
                          {"ageGroup": "51-60", "number": Math.floor(avNum60)},
                          {"ageGroup": "61-70", "number": Math.floor(avNum70)},
                          {"ageGroup": "71-80", "number": Math.floor(avNum80)},
                          {"ageGroup": "80+", "number": Math.floor(avNum90)},
                          {"ageGroup": "N/A", "number": Math.floor(avNoAgeGiven)}];
  console.log(tripDurationData);
  var svg = d3.select("#vimage"),
      width = 400,
      height = 300;

  var x = d3.scaleBand().range([0,width]).padding(0.4).domain(tripDurationData.map(function(d){return d.ageGroup;}));

  var y = d3.scaleLinear().range([height,0]).domain([0,d3.max(tripDurationData,function(d){return d.number;})]);

  var g = svg.append("g")
             .attr("transform", "translate("+ 100 + "," + 1300 + ")");

  g.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x))
   .append("text")
   .attr("y", height - 250)
   .attr("x", width - 100)
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("Age Group");

  g.append("g")
   .call(d3.axisLeft(y).tickFormat(function(d){
     return d;
   }).ticks(10))
   .append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy", "-5.1em")
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("Average Duration of Trip in Seconds");

   var div = d3.select("body").append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);


  g.selectAll(".bar")
    .data(tripDurationData)
    .enter().append("rect")
    .attr("class","bar2")
    .attr("x", function(d){return x(d.ageGroup); })
    .attr("y", function(d){return y(d.number); })
    .attr("width", x.bandwidth())
    .attr("height", function(d){return height - y(d.number); })
    .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(d.number)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
    .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
        });
//-------------------------------trips per day for march-------------------------------------
  var i = 0;
  //tally for total trips every 5 days * except 25-31 cus I cant do much about that
  var m5 = 0;
  var m10 = 0;
  var m15 = 0;
  var m20 = 0;
  var m25 = 0;
  var m31 = 0;
  while(i < data.length){
    if(data[i]["start station id"] == stationId.toString() || data[i]["end station id"] == stationId.toString()){
      console.log(parseInt(data[i]["starttime"].substr(2,2),10));
      //check the days and count the number of trips taken place each day
      if (parseInt(data[i]["starttime"].substr(2,2),10)<= 5){
        m5+=1;
      }
      else if(parseInt(data[i]["starttime"].substr(2,2),10)<=10){
        m10+=1;
      }
      else if(parseInt(data[i]["starttime"].substr(2,2),10)<=15){
        m15+=1;
      }
      else if(parseInt(data[i]["starttime"].substr(2,2),10)<=20){
        m20+=1;
      }
      else if(parseInt(data[i]["starttime"].substr(2,2),10)<=25){
        m25+=1;
      }
      else if(parseInt(data[i]["starttime"].substr(2,2),10)<=31){
        m31+=1;
      }
    }
    i++;
  }
  var tripsOnDates = [{"Date": "1st-5th", "number": m5},
                          {"Date": "6th-10th", "number": m10},
                          {"Date": "11th-15th", "number": m15},
                          {"Date": "16th-20th", "number": m20},
                          {"Date": "21st-25th", "number": m25},
                          {"Date": "26th-31st", "number": m31}];
  console.log(tripsOnDates);
  var svg = d3.select("#vimage"),
      width = 400,
      height = 300;

  var x = d3.scaleBand().range([0,width]).padding(0.4).domain(tripsOnDates.map(function(d){return d.Date;}));

  var y = d3.scaleLinear().range([height,0]).domain([0,d3.max(tripsOnDates,function(d){return d.number;})]);

  var g = svg.append("g")
             .attr("transform", "translate("+ 700 + "," + 1300 + ")");

  g.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x))
   .append("text")
   .attr("y", height - 250)
   .attr("x", width - 100)
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("Date Intervals");

  g.append("g")
   .call(d3.axisLeft(y).tickFormat(function(d){
     return d;
   }).ticks(10))
   .append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy", "-5.1em")
   .attr("text-anchor", "end")
   .attr("stroke", "black")
   .text("Number of Trips on Said Date");

   var div = d3.select("body").append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);


  g.selectAll(".bar")
    .data(tripsOnDates)
    .enter().append("rect")
    .attr("class","bar3")
    .attr("x", function(d){return x(d.Date); })
    .attr("y", function(d){return y(d.number); })
    .attr("width", x.bandwidth())
    .attr("height", function(d){return height - y(d.number); })
    .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(d.number)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
    .on("mouseout", function(d) {
          div.transition()
              .duration(500)
              .style("opacity", 0);
        });




});
//---------------------------------------- Gender pie  ---------------------------------------


d3.csv("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/201503-citibike-tripdata.csv").then(function(data){
    var i = 0;
    var numMale = 0;
    var numFem = 0;
    var numNA = 0;
    console.log(stationId)

    while(i < data.length){
        //console.log(stationId);
        if(data[i]["start station id"] == stationId.toString() || data[i]["end station id"] == stationId.toString()){
            if(data[i]["gender"] == "1"){
                numMale++;
            }
            else{
                if(data[i]["gender"] == "2"){
                    numFem++;
                }
                else{
                    numNA++;
                }
            }
        }
        i++;
    }

    console.log(numMale)
    console.log(numFem);
    console.log(numNA);

    var genderData = [{"name": "Male", "number": numMale}, {"name": "Female", "number": numFem}, {"name":"N/A", "number":numNA}];

    var genderWidth = 380;
    var genderHeight = 380;
    var genderRadius = 140
    var genderDisplacementX = 850
    var genderDisplacementY = 550

    var genderColor = d3.scaleOrdinal()
	.domain(genderData)
	.range(["#52527a","#003399","#cc00cc"]);

    var genderPie = d3.pie()
	.value(function(d) {
	    return d.number; })(genderData);

    var genderArc = d3.arc()
	.outerRadius(genderRadius - 10)
	.innerRadius(0);

    var genderLabelArc = d3.arc()
	.outerRadius(genderRadius)
	.innerRadius(genderRadius - 100);

    var genderSvgPie = d3.select("#vimage")
	.append("g")
	.attr("transform", "translate(" + genderDisplacementX + "," + genderDisplacementY +")");

    var genderArcy = genderSvgPie.selectAll("arc")
	.data(genderPie)
	.enter().append("g")
	.attr("class", "arc");

    var text = d3.select("#vimage")
    .append("text")
    .attr("x", genderDisplacementX - 90)
    .attr("y", genderDisplacementY - 150)
    .text("Gender Breakdown By Trip")
    .style("font-size", 20)
    .style("fill", "white")

    genderArcy.append("path")
	.attr("d", genderArc)
	.style("fill", function(d) {
	    //console.log(d);
	    return genderColor(d.data.name);
	});

    genderArcy.append("text")
	.attr("transform", function(d) { return "translate(" + genderLabelArc.centroid(d) + ")"; })
	.text(function(d) { return d.data.number;})
	.style("fill", "white");


//---------------------------------------- Legend for Gender Pie Chart ---------------------------------------

var genderPieLegend = d3.select("#vimage")
.append("g")
.attr("transform", "translate(" + genderDisplacementX + "," + genderDisplacementY +")");


var legendElements = genderPieLegend.selectAll("#vimage")
    .data(genderData)
    .enter().append('g')
    .attr("class", "genderLegend")
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
	    return genderColor(i)
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
        .style("font-size", 15);
});


//---------------------------------------- Customer/Subscriber pie  ---------------------------------------


d3.csv("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/201503-citibike-tripdata.csv").then(function(data){
    var i = 0;
    var numCust = 0;
    var numSub = 0;
    console.log(stationId)

    while(i < data.length){
        //console.log(stationId);
        if(data[i]["start station id"] == stationId.toString() || data[i]["end station id"] == stationId.toString()){
            if(data[i]["usertype"] == "Customer"){
                numCust++;
            }
            else{
                numSub++;
            }
        }
        i++;
    }

    console.log(numCust)
    console.log(numSub);

    var userTypeData = [{"name": "customer", "number": numCust}, {"name": "subscriber", "number": numSub}];

    var userTypeWidth = 380;
    var userTypeHeight = 380;
    var userTypeRadius = 140
    var userTypeDisplacementX = 850
    var userTypeDisplacementY = 900

    var userTypeColor = d3.scaleOrdinal()
	.domain(userTypeData)
	.range(["#ff9966","#9966ff"]);

    var userTypePie = d3.pie()
	.value(function(d) {
	    return d.number; })(userTypeData);

    var userTypeArc = d3.arc()
	.outerRadius(userTypeRadius - 10)
	.innerRadius(0);

    var userTypeLabelArc = d3.arc()
	.outerRadius(userTypeRadius)
	.innerRadius(userTypeRadius - 100);

    var userTypeSvgPie = d3.select("#vimage")
	.append("g")
	.attr("transform", "translate(" + userTypeDisplacementX + "," + userTypeDisplacementY +")");

    var userTypeArcy = userTypeSvgPie.selectAll("arc")
	.data(userTypePie)
	.enter().append("g")
	.attr("class", "arc");

    var text = d3.select("#vimage")
    .append("text")
    .attr("x", userTypeDisplacementX - 120)
    .attr("y", userTypeDisplacementY - 150)
    .text("Customers vs. Subscribers at this Station")
    .style("font-size", 20)
    .style("fill", "white")

    //<text x="800" y="50" font-family="sans-serif" font-size="20px" fill="white">Dock Status!</text>

    userTypeArcy.append("path")
	.attr("d", userTypeArc)
	.style("fill", function(d) {
	    //console.log(d);
	    return userTypeColor(d.data.name);
	});

    userTypeArcy.append("text")
	.attr("transform", function(d) { return "translate(" + userTypeLabelArc.centroid(d) + ")"; })
	.text(function(d) { return d.data.number;})
	.style("fill", "black");


//---------------------------------------- Legend for user Type Pie Chart ---------------------------------------

var userTypePieLegend = d3.select("#vimage")
.append("g")
.attr("transform", "translate(" + userTypeDisplacementX + "," + userTypeDisplacementY +")");


var legendElements = userTypePieLegend.selectAll("#vimage")
    .data(userTypeData)
    .enter().append('g')
    .attr("class", "userTypeLegend")
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
	    return userTypeColor(i)
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
        .style("font-size", 15);
});
