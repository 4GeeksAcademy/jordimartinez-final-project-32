"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, Product, Order
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

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
def delete_category(theid=None):
    if theid is not None:
        category = Category()
        category = category.query.get(theid)
        if category is not None:
            db.session.delete(category)
            db.session.commit()
            return jsonify({"message": "Category Deleted"}), 200
        else:
            return jsonify({"message": "Category not found"}), 404

@api.route('/category/deleteall', methods=['DELETE'])
def delete_categories():
    category = Category()
    category = category.query.all()

    for item in category:
        db.session.delete(item)
        db.session.commit()
    
    return jsonify({"message": "Categories Deleted"}), 200

@api.route('/category/populate', methods=['GET'])
def populate_category():
    category_list = [u'Analgesico', u'Antibiotico', u'Dermatológico y cosmético', u'Nutrición', u'Pediátrico', 
                     u'Primeros auxilios', u'Salud digestiva', u'Tratamientos', u'Vitaminas']
    #This list will be the first list just to populate the database, afterwards it will be redirected to the database to read the data

    for item in category_list:
        category = Category()
        category.name= item
        db.session.add(category)

    try: 
        db.session.commit()
        return jsonify("Adding categories"), 200
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify("Error"), 500

@api.route('/category/<int:theid>', methods=['PUT'])
def update_category(theid):
    category = Category.query.get(theid)

    if not category:
        return jsonify({"message": "Category not found"}), 404

    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({"message": "Name is required"}), 400

    category.name = name

    try:
        db.session.commit()
        return jsonify({"message": "Category updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating category", "error": str(e)}), 500
    
@api.route('/product', methods=['GET'])
def get_product():
    products = Product()
    products = products.query.all()
    return jsonify([item.serialize() for item in products]), 200

@api.route('/product/populate', methods=['GET'])
def populate_product():
   
    for i in range(8):
        num = 0
        product = Product()
        product.generic_name = "Perifar" + ' ' + str(num)
        product.active_ingredient = "Ibuprofeno"
        product.category_id = 4
        product.price = 50
        product.stock_quantity = 13
        product.image_url = 'url'
        product.description = 'A nice laugh the best mecine'
        db.session.add(product)

    try: 
        db.session.commit()
        return jsonify("Adding product"), 200
    except Exception as error:
        db.session.rollback()
        return jsonify(f"{error}"), 500

@api.route('/product', methods=['POST'])
def add_product():
    
    data = request.json
    if data is not None:
        product = Product(generic_name=data['generic_name'], active_ingredient=data['active_ingredient'],
                          category_id=data['category_id'], price=data['price'], stock_quantity=data['stock_quantity'],
                          image_url=data['image_url'], description=data['description'])
        db.session.add(product)
        db.session.commit()
        return jsonify({"message": "Adding a product"}), 201
    else:
        return jsonify({"message": "Couldnt add product"}), 400
    
@api.route('/product/<int:theid>', methods=['GET'])
def get_one_product(theid=None):
    if theid is not None:
        product = Product()
        product = product.query.get(theid)
        if product is not None:
            return jsonify(product.serialize()), 200
        else:
            return jsonify({"message": "Product not found"}), 404
    return jsonify({"message": "Id is None"}), 400

@api.route('/product/<int:theid>', methods=['DELETE'])
def delete_product(theid=None):
    if theid is not None:
        product = Product()
        product = product.query.get(theid)
        if product is not None:
            db.session.delete(product)
            db.session.commit()
            return jsonify({"message": "Product Deleted"}), 200
        else:
            return jsonify({"message": "Product not found"}), 404

@api.route('/product/deleteall', methods=['DELETE'])
def delete_products():
    products = Product()
    products = products.query.all()

    for item in products:
        db.session.delete(item)
        db.session.commit()
    
    return jsonify({"message": "Products Deleted"}), 200

@api.route('/product/<int:theid>', methods=['PUT'])
def update_product(theid):
    product = Product()
    product = product.query.get(theid)
    # generic_name, active_ingredient, category_ID, price, stock_quantity, imagen_url, description, createdAt
    if not product:
        return jsonify({"message": "Product not found"}), 404

    data = request.get_json()
    
    for key, value in data.items():
        if not value in data(key):
            return jsonify({"message": f"{key} is required"}), 400

        if hasattr(product, key):
            setattr(product, key, value)
        else:
            return jsonify({"message": f"Invalid attribute: {key}"}), 400

    try:
        db.session.commit()
        return jsonify({"message": "Product updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating product", "error": str(e)}), 500
    
@api.route('/user', methods=['GET'])
def get_users():
    users = User()
    users = users.query.all()
    return jsonify([item.serialize() for item in users]), 200

@api.route('/user/<int:theid>', methods=['GET'])
def get_user(theid=None):
    if theid is not None:
        user = User()
        user = user.query.get(theid)
        if user is not None:
            return jsonify(user.serialize()), 200
        else:
            return jsonify({"message": "User not found"}), 404
    return jsonify({"message": "Id is None"}), 400

@api.route('/user', methods=['POST'])
def add_user():
    # name, address, telephone, email, password, rol, birthday, status
    data = request.json
    if data is not None:
        user = User(name=data['name'], address=data['address'], telephone=data['telephone'], email=data['email'],
                    password=data['password'], rol=data['rol'], birthday=data['birthday'], status=data['status'])
        db.session.add(user)
        db.session.commit()
        return jsonify({"message":"Adding user"}), 201
    else:
        return jsonify({"message": "Couldnt add user"}), 400
    
@api.route('/user/<int:theid>', methods=['DELETE'])
def delete_user(theid=None):
    if theid is not None:
        user = User()
        user = user.query.get(theid)
        if user is not None:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User has been erased"}), 200
        else: 
            return jsonify({"message": "User is not in our database"}), 404
        
@api.route('/user/populate', methods=['GET'])
def populate_user():
    # name, address, telephone, email, password, rol, birthday, status
    user = User()
    user.name = 'Daniel Perdomo'
    user.address = 'Manuel de Lobos 789'
    user.telephone = '555-1876'
    user.email = 'daniel.perdomo.1987@gmail.com'
    user.password = 'password'
    user.rol = 'Admin'
    user.birthday = datetime(1987, 1, 18)
    user.status = 'Active'
    db.session.add(user)
    
    try:
        db.session.commit()
        return jsonify("User has been added"), 200
    except Exception as error:
        db.session.rollback()
        return jsonify(f"{error}"), 500
    
@api.route('/user/<int:theid>', methods=['PUT'])
def update_user(theid=None):
    user = User()
    user = user.query.get(theid)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.get_json()

    for key, value in data.items():
        if not value in data(key):
            return jsonify({"message": f"{key} is required"}), 400
        if hasattr(user, key):
            setattr(user, key, value)
        else:
            return jsonify({"message": f"Invalid attribute: {key}"}), 400
        
    try:
        db.session.commit()
        return jsonify({"message": "User updated succesfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating User", "error": str(e)}), 500

@api.route('/order', methods=['GET'])
def get_orders():
    orders = Order()
    orders = orders.query.all()
    return jsonify([item.serialize() for item in orders]), 200

@api.route('/order/<int:theid>', methods=['GET'])
def get_one_order(theid = None):
    if theid is not None:
        order = Order()
        order = order.query.get(theid)

        if order is not None: 
            return jsonify(order.serialize()), 200
        else: 
            return jsonify({"message": "Order not Found"}), 404
    return jsonify({"message": "Id doesnt correspond to an order right now"}), 400

@api.route('/order', methods=['POST'])
def create_kart():
    #Probablemente hay que reajustar esto cuando se cree la parte de logins y de jwt
    data = request.json
    if data is not None:
        order = Order(user_id=data['user_id'], order_status='Kart', order_type='Pickup')
        db.session.add(order)
        db.session.commit()
        return jsonify({"message": "Creating Kart"}), 200
    else:
        return jsonify({"message": "Kart Couldnt be Created"}), 400
    
@api.route('/order/<int:theid>', methods=['DELETE'])
def delete_order(theid=None):
    if theid is not None:
        order = Order()
        order = order.query.get(theid)
        if order is not None:
            db.session.delete(order)
            db.session.commit()
            return jsonify({"message": "Order Destroyed"}), 200
        else:
            return jsonify({"message": "Order Doesnt Exist"}), 404

#@api.route('/order')


    