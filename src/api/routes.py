"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category
from api.utils import generate_sitemap, APIException
from flask_cors import CORS



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/category', methods=['GET'])
def get_categories():
    categories = Category()
    categories = categories.query.all()
    return jsonify([item.serialize() for item in categories]), 200

@api.route('/category/<int:theid>', methods=['GET'])
def get_one_category(theid=None):
    if theid is not None:
        category = Category()
        category = category.query.get(theid)
        if category is not None:
            return jsonify(category.serialize()), 200
        else:
            return jsonify({"message": "Category not found"}), 404
    return jsonify({"message": "Id is None"}), 400

@api.route('/category', methods=['POST'])
def add_category():
    
    data = request.json
    if data is not None:
        category = Category(name=data['name'])
        db.session.add(category)
        db.session.commit()
        return jsonify({"message": "Adding a Category"}), 201
    else:
        return jsonify({"message": "Couldnt add category"}), 400
    
@api.route('/category/<int:theid>', methods=['DELETE'])
def delete_category(theid):
    
    if theid is not None:
        category = Category()
        category = category.query.get(theid)
        if category is not None:
            db.session.delete(category)
            db.session.commit()
            return jsonify({"message": "Category Deleted"}), 200
        else:
            return jsonify({"message": "Category not found"}), 404

