"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Category, Product, Order, Reviews, OrderProduct
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from datetime import datetime, timedelta
import os

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from werkzeug.security import check_password_hash
from base64 import b64encode
from api.utils import set_password
import cloudinary.uploader as uploader
from api.populate import meds, category_list, clients, orders_list

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

expires_in_minutes = 10
expires_delta = timedelta(minutes=expires_in_minutes)

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

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
@jwt_required()
def add_category():
    user_id = User.query.get(get_jwt_identity())
    user = User.query.get(user_id)
    if user.rol == 'CLIENT':
            return jsonify("Not allowed"), 405
    
    data = request.json
    if data is not None:
        category = Category(name=data['name'])
        db.session.add(category)
        db.session.commit()
        return jsonify({"message": "Adding a Category"}), 201
    else:
        return jsonify({"message": "Couldnt add category"}), 400
    
@api.route('/category/<int:theid>', methods=['DELETE'])
@jwt_required()
def delete_category(theid=None):
    user_id = User.query.get(get_jwt_identity())
    user = User.query.get(user_id)

    if user.rol == 'CLIENT':
            return jsonify("Not allowed"), 405
    
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
@jwt_required()
def delete_categories():
    user_id = User.query.get(get_jwt_identity())
    user = User.query.get(user_id)

    if user.rol == 'CLIENT':
            return jsonify("Not allowed"), 405


    category = Category()
    category = category.query.all()

    for item in category:
        db.session.delete(item)
        db.session.commit()
    
    return jsonify({"message": "Categories Deleted"}), 200

@api.route('/category/<int:theid>', methods=['PUT'])
@jwt_required()
def update_category(theid):
    user_id = User.query.get(get_jwt_identity())
    user = User.query.get(user_id)

    if user.rol == 'CLIENT':
            return jsonify("Not allowed"), 405
    
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

@api.route('/product', methods=['POST'])
@jwt_required()
def add_product():
    user = User.query.get(get_jwt_identity())
    user = User.query.get(user)

    if user.rol == 'CLIENT':
        return jsonify("You are not allowed here"), 405

    data_form = request.form
    data_files = request.files

   
    data = {
        "generic_name": data_form.get("generic_name"),
        "active_ingredient":data_form.get("active_ingredient"),
        "category_id":data_form.get("category_id"),
        "price":data_form.get("price"),
        "stock_quantity":data_form.get("stock"),
        "description":data_form.get("description"),
        "image_url":data_files.get("image")
    }
    # print(data)
    
    result_cloud = uploader.upload(data.get("image_url"))



    if data is not None:
        product = Product(generic_name=data['generic_name'], active_ingredient=data['active_ingredient'],
                          category_id=data['category_id'], price=data['price'], stock_quantity=data['stock_quantity'], description=data['description'],
                        image_url=result_cloud.get("secure_url"))
                       
        db.session.add(product)
        try:
            db.session.commit()
            return jsonify({"message": "Adding a product"}), 201
        except Exception as error:
            print(error.args)
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
@jwt_required()
def delete_product(theid=None):
    user = User.query.get(get_jwt_identity())
    user = User.query.get(user)

    if user.rol == 'CLIENT':
        return jsonify("You are not allowed here"), 405
    
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
@jwt_required()
def update_product(theid):
    product = Product.query.get(theid)

    if not product:
        return jsonify({"message": "Product not found"}), 404
    user = User.query.get(get_jwt_identity())
    user = User.query.get(user)

    if user.rol == 'CLIENT':
        return jsonify("You shouldnt be here!"), 405

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
@jwt_required()
def get_users():
    user_id = User.query.get(get_jwt_identity())
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message":"user not found"}), 404
    else:
        if user.rol == 'ADMIN':
            return jsonify(user.serialize()), 200
        else:
            return jsonify("You dont have access to this method"), 405

@api.route('/user/', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()  
    user = User.query.get(user_id)

    if user is not None:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"message": "User not found"}), 404
    
@api.route('/user', methods=['POST'])
def register_user():
    data_form = request.form
    
    data = { "name" : data_form.get("name"),
        "address" : data_form("address"),
        "telephone" : data_form("telephone"),
        "email" : data_form("email"),
        "password" : data_form("password"),
        "rol" : data_form.get("rol", "CLIENT").upper(),
        "birthday" : data_form("birthday"),
        "status" : "ACTIVE"
    }

    #All data in variables
    name = data.get("name", None)
    address = data.get("address", None)
    telephone = data.get("telephone", None)
    email = data.get("email", None)
    password = data.get("password", None)
    rol = data.get("rol", None)
    birthday = data.get("birthday", None)
    status = data.get("status", None)

    if email is None or password is None:
        return jsonify("To login you need to provide an email and a password"), 400
    else:
        user = User.query.filter_by(email=email).one_or_none()

        if user is not None:
            return jsonify("User exists, please login!"), 400

        salt = b64encode(os.urandom(32)).decode("utf-8")
        password = set_password(password, salt)

        user = User(name=name, address=address,telephone=telephone,email=email,password=password,rol=rol,birthday=birthday,status=status,salt=salt)

        try:
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "User created!!"}), 201
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return jsonify({"message":f"error: {error.args}"}), 500

@api.route('/user/<int:theid>', methods=['DELETE'])
@jwt_required()
def delete_user(theid=None):
    user_id = get_jwt_identity()  
    user_working = User.query.get(user_id)

    if user_working.rol == 'CLIENT':
        return jsonify("You shouldnt be here"), 405
    if theid is not None:
        user = User.query.get(theid)
        if user is not None:
            db.session.delete(user)
            try:
                db.session.commit()
                return jsonify({"message": "User has been erased"}), 200
            except Exception as e:
                print(e.args)
                db.session.rollback()           
                return jsonify("Something went absolutely awful here"), 500
        else: 
            return jsonify({"message": "User is not in our database"}), 404
        
@api.route('/user/', methods=['PUT'])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()  
    user = User.query.get(user_id)

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

@api.route('/order/deleteall', methods=['DELETE'])
def delete_orders():
    orders = Order()
    orders = orders.query.all()

    for item in orders:
        db.session.delete(item)
        db.session.commit()

    return jsonify({"message": "Orders Deleted"}), 200
    
@api.route('/order/update_status/<int:theid>', methods=['PUT'])
@jwt_required
def update_status(theid):
    order = Order.query.get(theid)
    user = User.query.get(get_jwt_identity())
    user = User.query.get(user.user_id)

    if user.rol == 'CLIENT':
        return jsonify("Method Not Allowed"), 405

    if order is not None:
        if order.order_status == 'KART':
            order.order_status = 'PENDING'
        elif order.order_status == 'PENDING':
            order.order_status = 'ACCEPTED'
        elif order.order_status == 'ACCEPTED':
            order.order_status = 'READY'
        elif order.order_status == 'READY':
            order.order_status = 'DONE'
        else:
            return jsonify({"message":"Order its done"}), 200
        try:
            db.session.commit()
            return jsonify({"message": f"Order status updated successfully: {order.order_status}"}), 200
        except Exception as error:
            print(error.args)
            return jsonify({"message": f"{error.args}"}), 500  
    return jsonify({"message": "Order does not exist"}), 404

@api.route('/review/<int:theid>', methods=['GET'])
def get_reviews(theid):
    #theid is the product id in this case
    reviews = Reviews.query.filter(Reviews.product_id==theid)
    if reviews is None:
        return jsonify("There is no product"), 404
    return jsonify([item.serialize() for item in reviews]), 200

@api.route('/review/<int:theid>', methods=['GET'])
def get_one_review(theid):
    review = Reviews.query.get(theid)
    if review is not None:
        return jsonify(review.serialize()), 200
    else:
        return jsonify({"message": "Review Id doesnt exist"}), 404

@api.route('/review', methods=['POST'])
@jwt_required()
def create_review():
    user = User.query.get(get_jwt_identity())
    data = request.json
    if data is not None:
        review = Reviews(user_id=user.user_id, product_id=data['product_id'], comment=data['comment'])
        db.session.add(review)

        db.session.commit()
        return jsonify({"message": "Creating Review"}), 200
    else:
        return jsonify({"message": "Review is not created"}), 500
    
@api.route('/review/<int:theid>', methods=['DELETE'])
@jwt_required()
def delete_review(theid=None):
    user=User.query.get(get_jwt_identity())

    if theid is not None:
        review = Reviews.query.get(theid)
        if review is not None and user.user_id == review.user_id:
            db.session.delete(review)
            try:
                db.session.commit()
                return jsonify({"message": "Review Destroyed"}), 200
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({"message": f"{error.args}"}), 500
        else:
            return jsonify({"message": "Review Doesnt Exist"}), 404
    return jsonify({"message": "Id is None"}), 500        

@api.route('/review/delete_all', methods=['DELETE'])
def delete_reviews():
    # Este metodo debe borrarse al final, solo esta para limpiar la bd
    review = Reviews()
    review = review.query.all()

    for item in review:
        db.session.delete(item)
        db.session.commit()

    return jsonify({"message": "Reviews Completely Deleted"}), 200
    
def create_kart(user):
    if user is not None:
        order = Order(user_id=user.user_id, order_status='KART', order_type='PICKUP')
        db.session.add(order)
        try:
            db.session.commit()
            return order.order_id
        except Exception as error:
            print(error.args)
            db.session.rollback()
            return jsonify({"message": "Problem commiting"}), 500
    else:
        return jsonify({"message": "User doesnt Exist"}), 400
    
@api.route('/login', methods=['POST'])
def login():

    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)

    if email is None or password is None:
        return jsonify({"message": "Email and password required"}), 400
    else:
        user = User.query.filter_by(email=email).one_or_none()

        if user is None:
            return jsonify({"message":"Incorrect Email or Password"}), 400
        else:
            if check_password(user.password, password, user.salt):
                token = create_access_token(identity=user.user_id)
                return jsonify({"token":token}), 200
            else:
                return jsonify({"message": "Bad Info"}), 400    
    
@api.route('/update-password', methods=['PUT'])
@jwt_required()
def update_pass():
    #Data que viene de entrada
    user = get_jwt_identity()
    body = request.json

    #Consiguiendo correo para actualizar la password
    user = get_user(user)
    email = user.get('email')

    user = User.query.filter_by(email=email).one_or_none()

    if user is not None:
        salt = b64encode(os.urandom(32).decode("utf-8"))
        password = set_password(body, salt)

        user.salt=salt
        user.password=password

        try:
            db.session.commit()
            return jsonify("Password has been updated"), 201
        except Exception as error:
            print(error.args)
            return jsonify("Password couldnt be updated"), 500

@api.route('/order/<int:theid>', methods=['GET'])
@jwt_required()
def get_products_in_order(theid):
    #Se pide que tenga jwt, para evitar que alguien revise las ordenes individuales de las personas ?
    products_in_order = OrderProduct.query.filter_by(order_id=theid).all()
    if products_in_order is None:
        return jsonify({"Message": "There are no products in this order"}), 400
    return jsonify([item.serialize() for item in products_in_order]), 200

@api.route('/order/<int:theid>', methods=['POST'])
@jwt_required()
def add_product_in_order(theid):
    user = User.query.get(get_jwt_identity())
    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    if not data or 'stock' not in data or not isinstance(data['stock'], int):
        return jsonify({"message": "Invalid data: 'stock' is required and must be an integer"}), 400

    order = Order.query.filter_by(user_id=user.user_id, order_status='KART').first()
    
    if order is None:
        order_id = create_kart(user)
    else:
        order_id = order.order_id

    order_product = OrderProduct(
        order_id=order_id,
        user_id=user.user_id,
        product_id=theid,  
        stock=data['stock']
    )

    db.session.add(order_product)

    try:
        db.session.commit()
        return jsonify({"message": "Producto agregado a la orden"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": f"Error: {error.args}"}), 500

@api.route('/order/<int:theid>', methods=['DELETE'])
@jwt_required()
def delete_product_in_order(theid):
    user = User.query.get(get_jwt_identity())
    if user is None:
        return jsonify("You need to log in"), 400
    
    order = Order.query.filter(Order.user_id==user.user_id, Order.order_status=='KART').one_or_none()
    if order is not None:
        product = Product.query.filter(OrderProduct.order_id==order.order_id, OrderProduct.product_id==theid)
        if product is not None:
            db.session.delete(product)
        else:
            return jsonify({"message": "This Product Does not Exist for this Order"}), 404
    else:
        return jsonify({"message": "Order Does Not Exist, something bad happened here"}), 400
    
    try:
        db.session.commit()
        return jsonify({"message": "Product has been deleted from this order"}), 200
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": f"{error.args}"}), 500
                        
@api.route('/category/populate', methods=['GET'])
def populate_category():

    for item in category_list:
        category = Category()
        category.name= item
        db.session.add(category)

    try: 
        db.session.commit()
        return jsonify("Adding categories"), 200
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify(f"{error.args}"), 500

@api.route('/product/populate', methods=['GET'])
def populate_product():
    
    category = Category()
    category = category.query.all()

    if not category:
        return jsonify({"message": "No categories found"}), 404

    for med in meds:            
        product = Product(
            generic_name=med["generic_name"],
            active_ingredient=med["active_ingredient"],
            category_id=med["category_id"], 
            price=med["price"],
            stock_quantity=med["stock_quantity"],
            image_url=med["image_url"],
            description=med["description"]
            )
        db.session.add(product)
        try:
            db.session.commit()
            return jsonify({"message": "Products populated successfully"}), 200
        except Exception as e:
            print(e.args)
            db.session.rollback()
            return jsonify({"message": str(e)}), 500
    
@api.route('/user/populate', methods=['GET'])
def populate_user():

    for client in clients:
        salt = b64encode(os.urandom(32)).decode("utf-8") 
        user = User(
            name=client['name'],
            address=client['address'],
            telephone=client['telephone'],
            email=client['email'],
            rol=client['rol'],
            birthday=client['birthday'],
            status=client['status'],
            salt = salt,
            password = set_password(client['password'], salt)
        )

        db.session.add(user)
    
    try:
        db.session.commit()
        return jsonify("User has been added"), 200
    except Exception as error:
        print(error.args)
        db.session.rollback()
        
        return jsonify(f"{error.args}"), 500
    
@api.route('/order/populate', methods=['GET'])
def populate_order():
    #order_id, user_id, order_status, order_type

    for order in orders_list:
        db.session.add(order)

    try:
        db.session.commit()
        return jsonify("Adding order"), 200
    except Exception as error:
        db.session.rollback()
        return jsonify(f"{error}"), 500

@api.route('/review/populate', methods=['GET'])
def populate_reviews():
    review = Reviews()
    
    user = User()
    user = user.query.first()
    product = Product()
    product = product.query.first()

    review.user_id = user.user_id
    review.product_id = product.product_id
    review.comment = "It was the best thing that ever happened to me. I was happier than the day my son was born."

    db.session.add(review)

    try:
        db.session.commit()
        return jsonify("Added review"), 200
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify(f"{error.args}"), 500

@api.route('/order/product', methods=['GET'])
def populate_order_products():
    pass