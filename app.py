from flask import Flask, render_template
from flask import request #login function
from flask import url_for, redirect, flash #redirect functions
from util import map as m

import os, random, json

app = Flask(__name__)
app.secret_key = os.urandom(32)

#Opens the JSON file with data related to the stations and imports as dictionary
with open('data/stations.json', 'r') as file:
    dict = json.load(file)
    listOfStations = dict["stationBeanList"]

    stationDictById = {}

    for entry in listOfStations:
        stationDictById[entry["id"]] = entry

#root directory
@app.route("/")
def landing():
    return render_template('landing.html', list = listOfStations)

#after search is done
@app.route("/<lat>/<long>")
def map(lat,long):
    stationId = request.args["id"] #returns id of station
    stationName = stationDictById[int(stationId)]["stationName"]
    #print(stationName)
    return render_template('home.html', link = m.displayMapC(lat,long), list = listOfStations, stationid = stationId, stationName = stationName, hasCoordinates = True)


if __name__=="__main__":
    app.debug=True
    app.run()
