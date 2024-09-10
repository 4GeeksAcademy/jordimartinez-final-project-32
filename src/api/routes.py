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
from api.productopoputale import medicamentos

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
    try:
        category = Category()
        category = category.query.all()

        if not category:
            return jsonify({"message": "No categories found"}), 404

        print(medicamentos[0])

        for med in medicamentos:            
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

        db.session.commit()
        return jsonify({"message": "Products populated successfully"}), 200

    except Exception as e:
        print(e.args)
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

   
    # for i in range(8):
    #     num = i
    #     product = Product()
    #     product.generic_name = "Perifar" + ' ' + str(num)
    #     product.active_ingredient = "Ibuprofeno"
    #     product.category_id = category.category_id
    #     product.price = 50
    #     product.stock_quantity = 13
    #     product.image_url = 'url'
    #     product.description = 'A nice laugh the best medicine'
    #     db.session.add(product)

    # try: 
    #     db.session.commit()
    #     return jsonify("Adding product"), 200
    # except Exception as error:
    #     db.session.rollback()
    #     return jsonify(f"{error}"), 500

@api.route('/product', methods=['POST'])
def add_product():
    
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
@jwt_required()
def get_users():
    user = User.query.get(get_jwt_identity())
    if user is None:
        return jsonify({"message":"user not found"}), 404
    return jsonify(user.serialize()), 200

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
def register_user():
    data_form = request.form
    
    data = { "name" : data_form.get("name"),
        "address" : data_form("address"),
        "telephone" : data_form("telephone"),
        "email" : data_form("email"),
        "password" : data_form("password"),
        "rol" : data_form("rol"),
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
    user.rol = 'ADMIN'
    user.birthday = datetime(1987, 1, 18)
    user.status = 'ACTIVE'
    db.session.add(user)
    
    try:
        db.session.commit()
        return jsonify("User has been added"), 200
    except Exception as error:
        db.session.rollback()
        print(error.args)
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
@jwt_required
def create_kart():
    #Probablemente hay que reajustar esto cuando se cree la parte de logins y de jwt
    user = User.query.get(get_jwt_identity())
    data = request.json
    if data is not None:
        order = Order(user_id=user, order_status='Kart', order_type='Pickup')
        try:
            db.session.add(order)
            return jsonify({"message": "Creating Kart"}), 201
        except Exception as error:
            print(error.args)
            db.session.commit()
            return jsonify({"message": "Problem commiting"}), 500
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

@api.route('/order/deleteall', methods=['DELETE'])
def delete_orders():
    orders = Order()
    orders = orders.query.all()

    for item in orders:
        db.session.delete(item)
        db.session.commit()

    return jsonify({"message": "Orders Deleted"}), 200

@api.route('/order/populate', methods=['GET'])
def populate_order():
    #order_id, user_id, order_status, order_type
    user = User()
    user = user.query.first()
    order = Order()
    order.user_id = user.user_id
    order.order_status = "KART"
    order.order_type = "PICKUP"
    db.session.add(order)

    try:
        db.session.commit()
        return jsonify("Adding order"), 200
    except Exception as error:
        db.session.rollback()
        return jsonify(f"{error}"), 500
    
@api.route('/order/update_status/<int:theid>', methods=['PUT'])
def update_status(theid):
    order = Order()
    order = order.query.get(theid)
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

@api.route('/review', methods=['GET'])
def get_reviews():
    reviews = Reviews()
    reviews = reviews.query.all()
    return jsonify([item.serialize() for item in reviews]), 200

@api.route('/review/<int:theid>', methods=['GET'])
def get_one_review(theid):
    review = Reviews()
    review = review.query.get(theid)

    if review is not None:
        return jsonify(review.serialize()), 200
    else:
        return jsonify({"message": "Review Id doesnt exist"}), 404

@api.route('/review', methods=['POST'])
def create_review():
    data = request.json
    if data is not None:
        review = Reviews(user_id=data['user_id'], product_id=data['product_id'], comment=data['comment'])
        db.session.add(review)

        db.session.commit()
        return jsonify({"message": "Creating Review"}), 200
    else:
        return jsonify({"message": "Review is not created"}), 500
    
@api.route('/review/<int:theid>', methods=['DELETE'])
def delete_review(theid=None):
    if theid is not None:
        review = Reviews()
        review = review.query.get(theid)
        if review is not None:
            db.session.delete(review)
            db.session.commit()
            return jsonify({"message": "Review Destroyed"}), 200
        else:
            return jsonify({"message": "Review Doesnt Exist"}), 404
    return jsonify({"message": "Id is None"}), 500        

@api.route('/review/delete_all', methods=['DELETE'])
def delete_reviews():
    review = Reviews()
    review = review.query.all()

    for item in review:
        db.session.delete(item)
        db.session.commit()

    return jsonify({"message": "Reviews Completely Deleted"}), 200

@api.route('/review/populate', methods=['GET'])
def populate_reviews():
    #review_id, user_id, product_id, comment
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


@api.route('/order_product/<int:theid>', methods=['GET'])
@jwt_required()
def get_products_in_order(theid):
    #Rehacer
    order_product = OrderProduct()
    order_product = order_product.query.all()
    user_order_product = []

    for op in order_product:
        if op.order_id == theid:
            user_order_product.append(op)
      
    return jsonify([item.serialize() for item in op]), 200

@api.route('/order/<int:theid>', methods=['POST'])
@jwt_required()
def add_product_in_order():
    # 1 - JWT required 
    # 2 - Llega con request
    # 3 - Verificar los endpoints de Order
    
    # [Usuario Logeado] -> Order, Producto

    user = User.query.get(get_jwt_identity())
    if user is None:
        return jsonify("User not found"), 404

    data = request.json
    
    cart_order = Order.query.filter(Order.user_id == user, Order.order_status == "KART").one_or_none()

    if cart_order is None:

        #Crear una orden nueva aca

    else:
        pass
        #agregar producto a la orden existente
    pass

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)

    if email is None or password is None:
        return jsonify({"message": "Email and password required"}), 400
    else:
        # Aca deberia chequear el pass, primero armar el acceso con salt
        user = User.query.filter_by(email=email).one_or_none()

        if user is None:
            return jsonify({"message":"Incorrect Email"}), 400
        else:
            if check_password(user.password, password, user.salt):
                token = create_access_token(identity=user.user_id)
                return jsonify({"token":token}), 200
            else:
                return jsonify({"message": "Bad Password"}), 400    
    
@api.route('/update-password', methods=['PUT'])
@jwt_required()
def update_pass():
    email = get_jwt_identity()
    body = request.json

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