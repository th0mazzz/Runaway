from flask import Flask, render_template
from flask import request, session #login function
from flask import url_for, redirect, flash #redirect functions

import os, random

app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route("/")
def root():
    return render_template('home.html') 

if __name__=="__main__":
    app.debug=True
    app.run()