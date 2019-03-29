# RunawayBikes
**presented by Peter Cwalina, Rubin Peci, and Thomas Zhao**

## Description:
We all live in the City of New York. After all, that's a requirement to even attend Stuyvesant High School. With all the global warming happening all around us, wouldn't it be nice if New York City could help curb carbon emissions? That is what CitiBikes are for: to provide an easy and green way to traverse the city! But one may ask, where are these stations for CitiBikes located? And what information may I glean from them? That is where RunawayBikes comes in.

RunawayBikes has a goal: to be able to showcase important information regarding CitiBikes in New York City. You will be able to see where these stations are on an (hopefully) interactive map, see how many available/unavailable bikes there are at each station, capacity, last reported status update from the station, and additonal statistics reporting features regarding previous rides.

### The data set(s) we will be using are:

- Citi Bike System Data

It is accessible using this link here (must click the sources called "citibike_stations" and "citibike_trips":
https://s3.amazonaws.com/tripdata/index.html

## Explanation of Plan
We plan to have a map where CitiBike stations are plotted. This would be the default item that shows if there is no user interaction.


When one hovers over a marker denoting a CitiBike station on a map, the user will be granted a pop-up with numerous statistics, both in numerical form and in graphical form that would best suit that information.

## Explanation of D3 Utilization
We plan to use D3 to plot the markers denoting CitiBike stations. This is in addition to the planned D3 usage for the pop-ups with both numerical and graphical statistics regarding the station the user is hovering over.

The enter() and exit() selections will be utilized a lot in order to input the statistical iformation into the application. Some sort of graphs will be used (likely pie charts, line graphs, and bar graphs) though this is completely open.

The transform() will be very useful in moving the plotted markers to where they should be. If the map is indeed interactive and the user is able to click-and-drag, then transform will be heavily used.

If we do have an interactive map, a zoomable map would be epic.