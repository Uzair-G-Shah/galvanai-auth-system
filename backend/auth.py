


# backend\auth.py
import jwt
from datetime import datetime
from flask import current_app

def generate_tokens(user):
    access_payload = {
        'user_id': user.id,
        'email': user.email,
        'role': user.role,
        'exp': datetime.utcnow() + current_app.config['JWT_ACCESS_TOKEN_EXPIRES']
    } 
    
    refresh_payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.utcnow() + current_app.config['JWT_REFRESH_TOKEN_EXPIRES']
    } 
    
    access_token = jwt.encode(
        access_payload, 
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )
    
    refresh_token = jwt.encode(
        refresh_payload,
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )
    
    return {
        'access_token': access_token,
        'refresh_token': refresh_token,
        'token_type': 'Bearer'
    } 

def decode_token(token):
    try:
        payload = jwt.decode(
            token,
            current_app.config['JWT_SECRET_KEY'],
            algorithms=['HS256']
        )
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None 
    
