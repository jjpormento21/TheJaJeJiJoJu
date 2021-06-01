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
customerData = mongo.db.customer_data
customerReviews = mongo.db.customer_reviews

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
    all_products = products.find()
    return render_template('feedbacks.html', products = all_products)

@app.route('/feedback_hub/post', methods=['GET','POST'])
def postFeedback():
    if request.method == 'POST':
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
        return redirect(url_for('feedback'))
    else:
        return redirect(url_for('feedback'))

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

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

@app.route('/checkout/confirm', methods=['GET','POST'])
def confirmCheckout():
    if request.method == 'POST':
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
        payMethod = request.form.get('paymentMethod')
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
                'paymentMethod':payMethod
            }
        )
        return render_template('checkout-confirm.html')
    else:
        return redirect(url_for('checkoutPage'))


@app.errorhandler(404)
def notFound(e):
    return render_template('404.html')

if __name__ == "__main__":
    app.run(debug=True)
