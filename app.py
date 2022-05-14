# import dependencies
from flask import Flask, jsonify, render_template, redirect
from flask_pymongo import PyMongo

#################################################
# Flask Setup
#################################################

# Create an app
app = Flask(__name__)
app._static_folder = 'static'

#################################################
# Database Setup
#################################################
# # Create connection variable
# app.config["MONGO_URI"] = "mongodb://localhost:27017/oceans_db"
# # conn = "mongodb://localhost:27017/oceans_db"
# # Pass connection to the pymongo instance.
# # client = pymongo.MongoClient(conn)
# mongo = PyMongo(app)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    print("Server received request for 'Home' page...")

    return render_template('index.html')

# 'sources' route
@app.route("/sources")
def sources():
    print("Loading Sources...")
    return render_template('sources.html')

if __name__ == "__main__":
    app.run()
