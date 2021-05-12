from flask import Flask, render_template, url_for, request, redirect
from flask_pymongo import PyMongo
from dotenv import load_dotenv
load_dotenv()
from bson.objectid import ObjectId
import os
app = Flask(__name__)

#database stuff
app.config['MONGO_URI'] = os.getenv('DEVELOPER')

mongo = PyMongo(app)
products = mongo.db.products

#routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/shop', methods=['GET'])
def shop():
    eye_products = products.find({'productCategory':'Eyes'})
    lip_products = products.find({'productCategory':'Lips'})
    skin_products = products.find({'productCategory':'Skin'})
    return render_template('catalog.html', eye_products=eye_products, lip_products = lip_products, skin_products=skin_products)

@app.route('/featured')
def featuredProducts():
    return render_template('featured.html')

@app.route('/feedback_hub')
def feedback():
    return render_template('feedbacks.html')

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.errorhandler(404)
def notFound(e):
    return render_template('404.html')

if __name__ == "__main__":
    app.run(debug=True)
