# RunawayBikes
**presented by Peter Cwalina, Rubin Peci, and Thomas Zhao**

## Description:
We all live in the City of New York. After all, that's a requirement to even attend Stuyvesant High School. With all the global warming happening all around us, wouldn't it be nice if New York City could help curb carbon emissions? That is what CitiBikes are for: to provide an easy and green way to traverse the city! But one may ask, where are these stations for CitiBikes located? And what information may I glean from them? That is where RunawayBikes comes in.

RunawayBikes has a goal: to be able to showcase important information regarding CitiBikes in New York City. You will be able to see where these stations are on an (hopefully) interactive map, see how many available/unavailable bikes there are at each station, the demographics of those who were at that station, and past trip statistics.

Edit: Our map ended up not being interactive.

### The data set(s) we will be using are:

- Citi Bike Station Data
- Citi Bike Trip Data (March 2015)

They are accessible with the following links, respectively:
https://feeds.citibikenyc.com/stations/stations.json
https://s3.amazonaws.com/tripdata/index.html

## Explanation of Plan
We plan to have a map where CitiBike stations are plotted. This would be the default item that shows if there is no user interaction.

When one hovers over a marker denoting a CitiBike station on a map, the user will be granted a pop-up with numerous statistics, both in numerical form and in graphical form that would best suit that information.

Edit: We ended up having a search system where the user would search for a specific station. The map that would then show up will only show where that specific station is on the map, nothing more. There will be data regarding that specific station displayed around the map.

## Explanation of D3 Utilization
We plan to use D3 to plot the markers denoting CitiBike stations. This is in addition to the planned D3 usage for the pop-ups with both numerical and graphical statistics regarding the station the user is hovering over.

The enter() and exit() selections will be utilized a lot in order to input the statistical information into the application. Some sort of graphs will be used (likely pie charts, line graphs, and bar graphs) though this is completely open.

The transform() will be very useful in moving the plotted markers to where they should be. If the map is indeed interactive and the user is able to click-and-drag, then transform will be heavily used.

If we do have an interactive map, a zoomable map would be epic.

Edit: We did not have multiple points on our map, nor is it interactive.

## Vision
![Our vision](https://raw.githubusercontent.com/th0mazzz/Runaway/master/doc/Vision.png)

## LAUNCH CODES
Firstly, one needs to install pip via the following:
```
sudo apt install python3-pip
```

After properly installing pip, one needs to be able to create virtual environments (this is done for safety).
```
pip install virtualenv
```

To create a virtual environment, simply do:
```
virtualenv <name you wish to give your virtualenv>
```

Great! You now have created a virtual environment. To activate it, do the following:
```
source <name of virtualenv>/bin/activate
```

Now you want to install wheel and flask through the following commands:
```
pip install wheel
```
```
pip install flask
```
Now locate the root directory of the application and find the file called "apiKey.txt". Paste your API key for MapQuest here.

To run the app, change into the directory of the application (where the file app.py is).
Now, run the file using:
```
python app.py
```

And you're good to go!
