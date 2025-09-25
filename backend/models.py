
# # backend\models.py
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from datetime import datetime, timedelta
# import random
# import string

# db = SQLAlchemy()
# bcrypt = Bcrypt()

# class User(db.Model):
#     __tablename__ = 'users'
    
#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(100), nullable=False)
#     last_name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     mobile_number = db.Column(db.String(20), nullable=False)
#     profile_picture_url = db.Column(db.String(255))
#     password_hash = db.Column(db.String(255), nullable=False)
#     role = db.Column(db.String(20), nullable=False, default='user')
#     is_verified = db.Column(db.Boolean, default=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
#     otps = db.relationship('OTP', backref='user', lazy=True, cascade='all, delete-orphan')
    
#     def set_password(self, password):
#         self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
#     def check_password(self, password):
#         return bcrypt.check_password_hash(self.password_hash, password)
    
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'first_name': self.first_name,
#             'last_name': self.last_name,
#             'email': self.email,
#             'mobile_number': self.mobile_number, 
#             'profile_picture_url': self.profile_picture_url,
#             'role': self.role,
#             'is_verified': self.is_verified,
#             'created_at': self.created_at.isoformat() if self.created_at else None,
#             'updated_at': self.updated_at.isoformat() if self.updated_at else None
#         }

# class OTP(db.Model):
#     __tablename__ = 'otps'
    
#     id = db.Column(db.Integer, primary_key=True) 
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False) 
#     code = db.Column(db.String(6), nullable=False) 
#     expires_at = db.Column(db.DateTime, nullable=False) 
#     is_used = db.Column(db.Boolean, default=False) 
#     created_at = db.Column(db.DateTime, default=datetime.utcnow) 
    
#     @staticmethod
#     def generate_otp():
#         return ''.join(random.choices(string.digits, k=6)) 
    
#     @classmethod
#     def create_for_user(cls, user_id):
#         otp = cls(
#             user_id=user_id, 
#             code=cls.generate_otp(),
#             expires_at=datetime.utcnow() + timedelta(minutes=10)
#         )
#         db.session.add(otp)
#         db.session.commit()
#         return otp
    
#     def is_valid(self):
#         return not self.is_used and datetime.utcnow() < self.expires_at 
    






# backend/models.py
from datetime import datetime, timedelta
import random
import string
from .extensions import db, bcrypt # <-- CHANGE THIS LINE

# db = SQLAlchemy() <-- REMOVE THIS LINE
# bcrypt = Bcrypt() <-- REMOVE THIS LINE

class User(db.Model):
    # ... the rest of the file remains exactly the same
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    mobile_number = db.Column(db.String(20), nullable=False)
    profile_picture_url = db.Column(db.String(255))
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    otps = db.relationship('OTP', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'mobile_number': self.mobile_number,
            'profile_picture_url': self.profile_picture_url,
            'role': self.role,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class OTP(db.Model):
    __tablename__ = 'otps'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    code = db.Column(db.String(6), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    is_used = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    @staticmethod
    def generate_otp():
        return ''.join(random.choices(string.digits, k=6))
    
    @classmethod
    def create_for_user(cls, user_id):
        otp = cls(
            user_id=user_id,
            code=cls.generate_otp(),
            expires_at=datetime.utcnow() + timedelta(minutes=10)
        )
        db.session.add(otp)
        db.session.commit()
        return otp
    
    def is_valid(self):
        return not self.is_used and datetime.utcnow() < self.expires_at
    
    