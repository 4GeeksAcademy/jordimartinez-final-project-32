from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.types import Enum as SQLAlchemyEnum

from datetime import datetime, timezone
from enum import Enum as PyEnum

db = SQLAlchemy()

class Rol(PyEnum):
    CLIENT = "Client"
    SELLER = "Seller"
    ADMIN = "Admin"

class Status(PyEnum):
    ACTIVE = "Active"
    INACTIVE = "Inactive"
    BANNED = "Banned"

class Order_Status(PyEnum):
    PENDING = "Pending"
    ACCEPTED = "Accepted"
    SENDING = "Sending"
    DONE = "Done"

class Order_Type(PyEnum):
    PICKUP = "Pickup"
    DELIVERY = "Delivery"

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    telephone = db.Column(db.String(16), unique=False, nullable=False)
    email = db.Column(db.String(16), unique=False, nullable=False)
    password = db.Column(db.String(16), unique=False, nullable=False)
    rol = db.Column(SQLAlchemyEnum(Rol), nullable=False) 
    birthday = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))
    status = db.Column(SQLAlchemyEnum(Status), unique=True, nullable=False)

    carrito = db.relationship('Carrito', backref='user', uselist=True)
    reviews = db.relationship('Reviews', backref='user', uselist=True)
    order = db.relationship('Order', backref='user', uselist=True)

    def serialize(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "address": self.address,
            "telephone": self.telephone,
            "email": self.email,
            "password": self.password,
            "rol": self.rol,
            "birthday": self.birthday,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "status": self.status
            # do not serialize the password, its a security breach
        }
    
class Product(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    generic_name = db.Column(db.String(120), unique=True, nullable=False)
    active_ingredient = db.Column(db.String(80), unique=False, nullable=False)
    category_id = db.Column(db.Integer, unique=False, nullable=False)
    price = db.Column(db.Integer, unique=False, nullable=False)
    stock_quantity = db.Column(db.Integer, unique=False, nullable=False)
    image_url = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(200), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    
    carrito = db.relationship('Carrito', back_populates='product', uselist=True)
    reviews = db.relationship('Reviews', back_populates='product', uselist=True)
    order_product = db.relationship('OrderProduct', back_populates='product', uselist=True)

    category = db.relationship('Category', backref='product', uselist=True)

    def serialize(self):
        return {
            "product_id": self.product_id,
            "generic_name": self.generic_name,
            "active_ingredient": self.active_ingredient,
            "category_id": self.category_id,
            "price": self.price,
            "stock_quantity": self.stock_quantity,
            "image_url": self.image_url,
            "description": self.description,
            "created_at": self.created_at,
        }

class Carrito(db.Model):
    carrito_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(120), unique=True, nullable=False)
    product_id = db.Column(db.Integer, unique=False, nullable=False)
    stock_quantity = db.Column(db.Integer, unique=False, nullable=False)
    order_status = db.Column(SQLAlchemyEnum(Order_Status), nullable=False)
    order_type = db.Column(SQLAlchemyEnum(Order_Type), nullable=False)

    product = db.relationship('Product', backref='carrito', uselist=True)

    def serialize(self):
        return {
            "carrito_id": self.carrito_id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "stock_quantity": self.stock_quantity,
            "order_status": self.order_status,
            "order_type": self.order_type
        }

class Reviews(db.Model):
    review_id = db.Column(db.Integer, unique=True, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(120), nullable=False)

    user = db.relationship('User', backref='reviews', uselist=True)

    def serialize(self):
        return {
            "review_id": self.review_id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "comment": self.comment
        }

class Category(db.Model):
    category_id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

    product = db.relationship('Product', backref='category', uselist=True)

    def serialize(self):
        return {
            "category_id": self.category_id,
            "name": self.name
        }

class Order(db.Model):
    order_id = db.Column(db.Integer, unique=True, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    order_status = db.Column(SQLAlchemyEnum(Order_Status), nullable=False)
    order_type = db.Column(SQLAlchemyEnum(Order_Type), nullable=False)

    user = db.relationship('User', backref='order', uselist=True)
    order_product = db.relationship('OrderProduct', backref='order', uselist=True)

    def serialize(self):
        return {
            "order_id": self.order_id,
            "user_id": self.user_id,
            "order_status": self.order_status,
            "order_type": self.order_type
        }

class OrderProduct(db.Model):
    order_product_id = db.Column(db.Integer, unique=True, primary_key=True)
    order_id = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

    order = db.relationship('Order', backref='orderproduct', uselist=True)
    product = db.relationship('Product', backref='orderproduct', uselist=True)

    def serialize(self):
        return {
            "order_product_id": self.order_product_id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "stock": self.stock
        }
    
