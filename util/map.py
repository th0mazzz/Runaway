import urllib
from urllib import request

def displayMap():
    return "https://www.mapquestapi.com/staticmap/v5/map?key=h0f9GfD3xpNsoelpFNawGNneZ25F61GC&center=40.7643971,-73.97371465&zoom=10&size=@2x"

def displayMapC(lat,long):
    return "https://www.mapquestapi.com/staticmap/v5/map?key=h0f9GfD3xpNsoelpFNawGNneZ25F61GC&center=" + lat + "," + long + "&zoom=15&size=@2x"
