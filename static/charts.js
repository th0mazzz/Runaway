var svg1 = document.getElementById("vimage");
var stationId = svg1.getAttribute("station");
console.log(stationId)
d3.json("https://raw.githubusercontent.com/th0mazzz/Runaway/master/data/stations.json").then(function(data) {
  console.log("hi");
  for (var x = 0;x < data.stationBeanList.length;x++){
    if (stationId == data.stationBeanList[x].id){
      console.log(data.stationBeanList[x]);
      var docks = data.stationBeanList[x].totalDocks
      var availableDocks = data.stationBeanList[x].availableDocks
      var bikes = data.stationBeanList[x].availableBikes
      var stationData = {docks:availableDocks,bikes:bikes,freeSpace:docks - (bikes + availableDocks)}
      console.log(stationData);
    }
  }
});
