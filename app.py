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
    eye_products = products.find({'productCategory':'eyes'})
    lip_products = products.find({'productCategory':'lips'})
    skin_products = products.find({'productCategory':'skin'})
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

#Admin Page Routes
@app.route('/admin/dashboard')
def dashboard():
    return render_template('admin/dashboard.html')

@app.route('/admin/add_data', methods=['GET', 'POST'])
def addData():
    all_products = products.find()
    if request.method == 'POST':
        productName = request.form.get('productTitle')
        productDescription = request.form.get('productDescription')
        detailedDescr = request.form.get('detailedDescr')
        productCategory = request.form.get('productCategory')
        price = request.form.get('price')
        imgURL = request.form.get('imgURL')
        stockNumber = request.form.get('stockNumber')
        isFeatured = request.form.get('customRadio')
        products.insert_one(
            {
                'productName': productName,
                'productDescription': productDescription,
                'detailedDescription': detailedDescr,
                'productCategory': productCategory,
                'price': price,
                'imageURL': imgURL,
                'stockNumber': stockNumber,
                'featured': isFeatured 
            }
        )
        return render_template('admin/add_data.html')
    else:
        return render_template('admin/add_data.html')

if __name__ == "__main__":
    app.run(debug=True)
