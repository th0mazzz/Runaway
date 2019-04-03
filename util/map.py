import urllib
from urllib import request

def displayMap():
    '''Returns a url to the mapquest api that returns a map of all the relevant parts of NYC'''
    return "https://www.mapquestapi.com/staticmap/v5/map?key=h0f9GfD3xpNsoelpFNawGNneZ25F61GC&center=40.7643971,-73.97371465&zoom=10&size=@2x"

def displayMapC(lat,long):
    '''Returns a url to the mapquest api that shows a map of a specific citibike spot'''
    return "https://www.mapquestapi.com/staticmap/v5/map?key=h0f9GfD3xpNsoelpFNawGNneZ25F61GC&center=" + lat + "," + long + "&zoom=15&size=@2x"
