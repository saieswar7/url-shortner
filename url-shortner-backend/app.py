from flask import Flask,request,jsonify,redirect
from flask_cors import CORS
from functionality import *
app = Flask(__name__)
cors = CORS(app)

@app.route('/short_the_url',methods = ["POST"])
def convert_longurl_short_url():
    try:
        data = request.get_json()
        response = shorten_the_url(data["long_url"])
        response = {"code":response}
        return jsonify(response)
    except :
        print()

@app.route('/redirect_to_original_url',methods = ["GET"])
def redirect_to_original_url():
    try:
        data = request.args.get('code')
        response = get_original_url(data)
        return jsonify({"originalUrl":response})
    except:
        return jsonify({"codenotfound":"URL is not supported"})

if __name__ == '__main__':
    app.run()
