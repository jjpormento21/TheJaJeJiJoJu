from flask import Flask, render_template, url_for, request, redirect
from flask_pymongo import PyMongo
from dotenv import load_dotenv
load_dotenv()
from bson.objectid import ObjectId
import os
from datetime import datetime
app = Flask(__name__)

#database stuff
app.config['MONGO_URI'] = os.getenv('DEVELOPER')

mongo = PyMongo(app)
products = mongo.db.products

dateToday = datetime.now()
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
                'price': float(price),
                'imageURL': imgURL,
                'stockNumber': int(stockNumber),
                'featured': isFeatured,
                'datePosted': dateToday 
            }
        )
        return redirect(url_for('dashboard'))
    else:
        return render_template('admin/add_data.html')

@app.route('/admin/delete_data_all')
def deleteAll():
    products.delete_many({})
    return redirect(url_for('dashboard'))

@app.route('/admin/view')
def viewAll():
    all_products = products.find()
    return render_template('admin/view.html', products=all_products)

@app.route('/admin/delete_product/<oid>')
def deleteProduct(oid):
    products.delete_one({'_id': ObjectId(oid)})
    return redirect(url_for('viewAll'))

@app.route('/admin/edit_product/<oid>', methods = ['GET', 'POST'])
def editProductData(oid):
    currentProduct = products.find_one_or_404({'_id': ObjectId(oid)})
    if request.method == 'POST':
        productName = request.form.get('productTitle')
        productDescription = request.form.get('productDescription')
        detailedDescr = request.form.get('detailedDescr')
        productCategory = request.form.get('productCategory')
        price = request.form.get('price')
        imgURL = request.form.get('imgURL')
        stockNumber = request.form.get('stockNumber')
        isFeatured = request.form.get('customRadio')
        products.update_one({'_id': ObjectId(oid)},
        {'$set':
            {
                'productName': productName,
                'productDescription': productDescription,
                'detailedDescription': detailedDescr,
                'productCategory': productCategory,
                'price': float(price),
                'imageURL': imgURL,
                'stockNumber': float(stockNumber),
                'featured': isFeatured,
                'datePosted': dateToday 
            }
        }
        )
        return redirect(url_for('viewAll'))
    else:
        return render_template('admin/edit_product.html', currentProduct=currentProduct)

if __name__ == "__main__":
    app.run(debug=True)
