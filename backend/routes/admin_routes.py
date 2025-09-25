

# backend\routes\admin_routes.py
import os
import uuid
from flask import request, current_app
from flask_restx import Namespace, Resource, fields
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from PIL import Image
from ..models import db, User, OTP
from ..decorators import admin_required
from ..email_service import send_otp_email

admin_ns = Namespace('admin', description='Admin operations')

# Parsers for file uploads and form data
upload_parser = admin_ns.parser()
upload_parser.add_argument('profile_picture', location='files', type=FileStorage, required=False)
upload_parser.add_argument('first_name', location='form', required=True)
upload_parser.add_argument('last_name', location='form', required=True)
upload_parser.add_argument('email', location='form', required=True)
upload_parser.add_argument('password', location='form', required=True)
upload_parser.add_argument('mobile_number', location='form', required=True)

user_update_model = admin_ns.model('UserUpdate', {
    'first_name': fields.String(),
    'last_name': fields.String(),
    'mobile_number': fields.String()
})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in current_app.config['ALLOWED_EXTENSIONS']

def save_profile_picture(file):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        upload_path = os.path.join(current_app.root_path, current_app.config['UPLOAD_FOLDER'])
        os.makedirs(upload_path, exist_ok=True)
        filepath = os.path.join(upload_path, unique_filename)
        
        img = Image.open(file)
        img.thumbnail((500, 500))
        img.save(filepath)
        
        return f"/uploads/{unique_filename}"
    return None

@admin_ns.route('/users')
class UserList(Resource):
    @admin_required
    def get(self):
        users = User.query.filter_by(role='user').all()
        return [user.to_dict() for user in users], 200
    
    @admin_required
    @admin_ns.expect(upload_parser)
    def post(self):
        args = upload_parser.parse_args()
        if User.query.filter_by(email=args['email']).first():
            return {'message': 'Email already exists'}, 400
        
        user = User(
            first_name=args['first_name'],
            last_name=args['last_name'],
            email=args['email'],
            mobile_number=args['mobile_number'], 
            role='user'
        )
        user.set_password(args['password'])
        
        if 'profile_picture' in request.files:
            file = request.files['profile_picture']
            if file.filename != '':
                profile_url = save_profile_picture(file)
                if profile_url:
                    user.profile_picture_url = profile_url
        
        db.session.add(user)
        db.session.commit()
        
        otp = OTP.create_for_user(user.id)
        send_otp_email(user.email, otp.code, user.first_name)
        
        return {'message': 'User created successfully. OTP sent to email.', 'user': user.to_dict()}, 201

@admin_ns.route('/users/<int:user_id>')
class UserDetail(Resource):
    @admin_required
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return user.to_dict(), 200
    
    @admin_required
    @admin_ns.expect(user_update_model)
    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name) 
        user.mobile_number = data.get('mobile_number', user.mobile_number) 
        
        db.session.commit()
        return {'message': 'User updated successfully', 'user': user.to_dict()}, 200 
    
    @admin_required
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        if user.role == 'super_admin':
            return {'message': 'Cannot delete super admin'}, 403 
        
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200
    

