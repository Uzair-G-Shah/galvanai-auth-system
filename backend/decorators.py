
# backend\decorators.py
from functools import wraps
from flask import request, jsonify
from .auth import decode_token
from .models import User

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        payload = decode_token(token)
        if not payload:
            return jsonify({'message': 'Token is invalid or expired'}), 401
        
        request.current_user = User.query.get(payload['user_id'])
        if not request.current_user:
            return jsonify({'message': 'User not found'}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function

def admin_required(f):
    @wraps(f)
    @jwt_required
    def decorated_function(*args, **kwargs):
        if request.current_user.role != 'super_admin':
            return jsonify({'message': 'Admin access required'}), 403
        return f(*args, **kwargs)
    
    return decorated_function


