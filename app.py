from flask import Flask, render_template, url_for, request, redirect, session, g, flash
from flask_pymongo import PyMongo
from dotenv import load_dotenv
load_dotenv()
from bson.objectid import ObjectId
import os
import json
from datetime import datetime
app = Flask(__name__)

#database stuff
app.config['MONGO_URI'] = os.getenv('DEVELOPER')
# for login page
app.secret_key = os.getenv('SECRET_KEY')
user = {
    "id": 1,
    "username": os.getenv('ADMIN_USER'),
    "password":os.getenv('ADMIN_PASSWORD')
}

mongo = PyMongo(app)
products = mongo.db.products
customerData = mongo.db.customer_data
customerReviews = mongo.db.customer_reviews

dateToday = datetime.utcnow()
@app.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        currentUser = user['username']
        g.user = currentUser

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
    featured_products = products.find({'featured':'True'}).limit(6)
    return render_template('featured.html', products=featured_products)

@app.route('/feedback_hub')
def feedback():
    all_products = products.find()
    all_reviews = customerReviews.find().limit(6)
    return render_template('feedbacks.html', products = all_products, reviews = all_reviews)

@app.route('/feedback_hub/post', methods=['POST'])
def postFeedback():
    username = request.form.get('username')
    productName = request.form.get('productName')
    userFeedback = request.form.get('feedback')
    productRating = request.form.get('product-rating')
    customerReviews.insert_one(
        {
            'username': username,
            'productName': productName,
            'feedback': userFeedback,
            'rating': int(productRating),
            'datePosted': dateToday
        }
    )
    return redirect(url_for('shop'))

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.route('/wishlist')
def wishlist():
    return render_template('wishlist.html')

@app.route('/product/<oid>')
def product_info(oid):
    product = products.find_one_or_404({'_id': ObjectId(oid)})
    reviews = customerReviews.find()
    return render_template('product_info.html', product = product, reviews = reviews)

@app.route('/checkout')
def checkoutPage():
    return render_template('checkout.html')

@app.route('/checkout-test')
def checkoutTest():
    return render_template('checkout-confirm.html')

@app.route('/blank')
def blankPage():
    return render_template('blank.html')

@app.route('/checkout/confirm', methods=['POST'])
def confirmCheckout():
    custFirstName = request.form.get('firstName')
    custLastName = request.form.get('lastName')
    custEmail = request.form.get('email')
    custUsrname = request.form.get('username')
    custPhone1 = request.form.get('phone1')
    custPhone2 = request.form.get('phone2')
    billingAdd = request.form.get('billingAdd')
    shipAdd = request.form.get('shipAdd')
    region = request.form.get('region')
    custProvince = request.form.get('province')
    custCity = request.form.get('city')
    zipcode = request.form.get('zipcode')
    courier = request.form.get('courier')
    shipFee = request.form.get('shipFee')
    payMethod = request.form.get('paymentMethod')
    purchases = request.form.get('purchases')
    totalPurchases = request.form.get('totalPurchased')
    customerData.insert_one(
        {
            'firstName': custFirstName,
            'lastName': custLastName,
            'email': custEmail,
            'username': custUsrname,
            'phone1': custPhone1,
            'phone2': custPhone2,
            'billingAddress': billingAdd,
            'shippingAddress': shipAdd,
            'region': region,
            'province': custProvince,
            'city': custCity,
            'zipcode': int(zipcode),
            'courier': courier,
            'shipFee': shipFee,
            'paymentMethod':payMethod,
            'orderDate': dateToday,
            'purchases': json.loads(purchases),
            'totalPurchased': float(totalPurchases)
        }
    )
    return render_template('checkout-confirm.html')


@app.errorhandler(404)
def notFound(e):
    return render_template('404.html')

#Admin Page Routes
@app.route('/admin')
def admin():
    return redirect(url_for('dashboard'))

@app.route('/admin/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session.pop('user_id', None)
        username = request.form.get('username')
        password = request.form.get('password')
        currentUser = user['username']
        if currentUser and user['password'] == password:
            session['user_id'] = user['id']
            return redirect(url_for('dashboard'))

        flash('Failed to login. Please try again.')
        return redirect(url_for('login'))
    return render_template('admin/login.html')

@app.route('/admin/logout')
def logout():
   session.pop('user_id', None)
   return redirect(url_for('login'))

@app.route('/admin/dashboard')
def dashboard():
    if not g.user:
        return redirect(url_for('login'))
    return render_template('admin/dashboard.html')

@app.route('/admin/add_data', methods=['GET', 'POST'])
def addData():
    if not g.user:
        return redirect(url_for('login'))
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

@app.route('/admin/reviews')
def reviews():
    if not g.user:
        return redirect(url_for('login'))
    all_products = products.find()
    return render_template('admin/product_reviews.html', products=all_products)

@app.route('/admin/reviews/product/<oid>') 
def product_review(oid):
    if not g.user:
        return redirect(url_for('login'))
    product = products.find_one_or_404({'_id': ObjectId(oid)})
    reviews = customerReviews.find()
    return render_template('admin/review_record.html', product = product, reviews = reviews)   
    
@app.route('/admin/view/products')
def viewAllProducts():
    if not g.user:
        return redirect(url_for('login'))
    all_products = products.find()
    return render_template('admin/view.html', products=all_products)

@app.route('/admin/view/records')
def viewRecords():
    if not g.user:
        return redirect(url_for('login'))
    customer_records = customerData.find()
    return render_template('/admin/customer-records.html', records = customer_records)

@app.route('/admin/view/records/<oid>')
def viewSingleRecord(oid):
    if not g.user:
        return redirect(url_for('login'))
    customer_record = customerData.find_one_or_404({'_id': ObjectId(oid)})
    return render_template('/admin/customer-info.html', record = customer_record)

#Deleting stuff
@app.route('/admin/delete_data_all')
def deleteAllProducts():
    if not g.user:
        return redirect(url_for('login'))
    products.delete_many({})
    return redirect(url_for('viewAllProducts'))

@app.route('/admin/delete_records_all')
def deleteAllRecords():
    if not g.user:
        return redirect(url_for('login'))
    customerData.delete_many({})
    return redirect(url_for('viewRecords'))

@app.route('/admin/delete_record/<oid>')
def deleteRecord(oid):
    if not g.user:
        return redirect(url_for('login'))
    customerData.delete_one({'_id': ObjectId(oid)})
    return redirect(url_for('viewRecords'))

@app.route('/admin/delete_product/<oid>')
def deleteProduct(oid):
    if not g.user:
        return redirect(url_for('login'))
    products.delete_one({'_id': ObjectId(oid)})
    return redirect(url_for('viewRecords'))

@app.route('/admin/delete_review/<oid>')
def deleteReview(oid):
    review = customerReviews.delete_one({'_id': ObjectId(oid)})
    return redirect(url_for('reviews'))

@app.route('/admin/edit_product/<oid>', methods = ['GET', 'POST'])
def editProductData(oid):
    if not g.user:
        return redirect(url_for('login'))
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
                'stockNumber': int(stockNumber),
                'featured': isFeatured,
                'datePosted': dateToday 
            }
        }
        )
        return redirect(url_for('viewAllProducts'))
    else:
        return render_template('admin/edit_product.html', currentProduct=currentProduct)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')