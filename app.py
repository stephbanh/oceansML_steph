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

# 'key' route
@app.route("/key")
def key():
    print("Loading Key...")
    return render_template('key.html')

# 'analysis' direct route
@app.route("/direct")
def direct():
    print("Loading Fish...")
    return render_template('direct.html')

# 'analysis' indirect route
@app.route("/indirect")
def indirect():
    print("Loading Trash...")
    return render_template('indirect.html')

# 'sources' route
@app.route("/sources")
def sources():
    print("Loading Sources...")
    return render_template('sources.html')

# 'prediction' route
@app.route("/predict")
def predict():
    print("Loading Predictions...")
    return render_template('predict.html')

# 'data' route
@app.route("/data")
def data():
    print("Loading Data...")
    return render_template('data.html')

# 'process' route
@app.route("/process")
def process():
    print("Loading Process...")
    return render_template('process.html')

if __name__ == "__main__":
    app.run()
