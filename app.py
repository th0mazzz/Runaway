from flask import Flask, render_template
from flask import request #login function
from flask import url_for, redirect, flash #redirect functions
from util import map as m

import os, random, json

app = Flask(__name__)
app.secret_key = os.urandom(32)

with open('data/stations.json', 'r') as file:
    dict = json.load(file)
    listOfStations = dict["stationBeanList"]

    stationDictById = {}
    for entry in listOfStations:
        stationDictById[entry["id"]] = entry


@app.route("/")
def root():
    return render_template('home.html', link = m.displayMap(), list = listOfStations)

@app.route("/<lat>/<long>")
def map(lat,long):
    stationId = request.args["id"] #returns id of station
    return render_template('home.html', link = m.displayMapC(lat,long), list = listOfStations, stationid = stationId)


if __name__=="__main__":
    app.debug=True
    app.run()
