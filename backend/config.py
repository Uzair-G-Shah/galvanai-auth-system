


# backend\config.py
import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key') 
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key') 
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15) 
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7) 
    
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///app.db') 
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com') 
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587)) 
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true' 
    MAIL_USERNAME = os.getenv('MAIL_USERNAME') 
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD') 
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER') 
    
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads') 
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024)) 
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'} 
    
    SUPER_ADMIN_EMAIL = os.getenv('SUPER_ADMIN_EMAIL') 
    SUPER_ADMIN_PASSWORD = os.getenv('SUPER_ADMIN_PASSWORD') 
    SUPER_ADMIN_FIRST_NAME = os.getenv('SUPER_ADMIN_FIRST_NAME', 'Super') 
    SUPER_ADMIN_LAST_NAME = os.getenv('SUPER_ADMIN_LAST_NAME', 'Admin') 


