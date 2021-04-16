from flask import Flask, render_template, url_for, request, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about-us')
def index():
    return render_template('about_us.html')

if __name__ == "__main__":
    app.run(debug=True)
