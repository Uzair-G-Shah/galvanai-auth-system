
# backend\routes\auth_routes.py
from flask import request
from flask_restx import Namespace, Resource, fields
from ..models import db, User, OTP
from ..auth import generate_tokens, decode_token
from ..email_service import send_otp_email

auth_ns = Namespace('auth', description='Authentication operations')

# Models for Swagger documentation
login_model = auth_ns.model('Login', {
    'email': fields.String(required=True),
    'password': fields.String(required=True)
})
verify_otp_model = auth_ns.model('VerifyOTP', {
    'email': fields.String(required=True),
    'otp': fields.String(required=True)
})
refresh_model = auth_ns.model('RefreshToken', {
    'refresh_token': fields.String(required=True)
})

@auth_ns.route('/login')
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return {'message': 'Invalid email or password'}, 401
        
        if not user.is_verified:
            otp = OTP.create_for_user(user.id)
            send_otp_email(user.email, otp.code, user.first_name)
            return {'message': 'Please verify your email first. A new OTP has been sent.'}, 403
        
        tokens = generate_tokens(user)
        return {'message': 'Login successful', 'user': user.to_dict(), 'tokens': tokens}, 200

@auth_ns.route('/verify-otp')
class VerifyOTP(Resource):
    @auth_ns.expect(verify_otp_model)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        otp_code = data.get('otp')
        
        user = User.query.filter_by(email=email).first()
        if not user:
            return {'message': 'User not found'}, 404
            
        if user.is_verified:
            return {'message': 'Email already verified'}, 400
            
        otp = OTP.query.filter_by(user_id=user.id, code=otp_code, is_used=False).order_by(OTP.created_at.desc()).first()
        
        if not otp or not otp.is_valid():
            return {'message': 'Invalid or expired OTP'}, 400
            
        otp.is_used = True 
        user.is_verified = True
        db.session.commit()
        
        tokens = generate_tokens(user)
        return {'message': 'Email verified successfully', 'user': user.to_dict(), 'tokens': tokens}, 200

@auth_ns.route('/refresh')
class RefreshToken(Resource):
    @auth_ns.expect(refresh_model)
    def post(self):
        data = request.get_json()
        refresh_token = data.get('refresh_token')
        
        if not refresh_token:
            return {'message': 'Refresh token is required'}, 400
            
        payload = decode_token(refresh_token)
        if not payload:
            return {'message': 'Invalid or expired refresh token'}, 401
            
        user = User.query.get(payload['user_id'])
        if not user:
            return {'message': 'User not found'}, 404
            
        tokens = generate_tokens(user)
        return {'message': 'Token refreshed successfully', 'tokens': tokens}, 200
    

