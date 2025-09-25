

# # backend\app.py
# import os
# import click
# from flask import Flask, send_from_directory
# from flask_restx import Api
# from flask_cors import CORS
# from flask_migrate import Migrate
# from config import Config
# from models import db, bcrypt, User
# from email_service import mail
# from routes.auth_routes import auth_ns
# from routes.admin_routes import admin_ns

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)
    
#     # Initialize extensions
#     db.init_app(app)
#     bcrypt.init_app(app)
#     mail.init_app(app)
#     Migrate(app, db)
    
#     # Configure CORS
#     CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True) 
    
#     # Initialize API
#     api = Api(app, version='1.0', title='GalvanAI Auth API', description='A comprehensive auth API', doc='/api/docs', prefix='/api')
    
#     # Register namespaces
#     api.add_namespace(auth_ns, path='/auth') 
#     api.add_namespace(admin_ns, path='/admin')
    
#     # Serve uploaded files
#     @app.route('/uploads/<path:filename>')
#     def uploaded_file(filename):
#         return send_from_directory(os.path.join(app.root_path, app.config['UPLOAD_FOLDER']), filename)
    
#     # CLI Commands
#     @app.cli.command('create-super-admin')
#     def create_super_admin():
#         """Create the super admin user from .env variables.""" 
#         email = app.config.get('SUPER_ADMIN_EMAIL')
#         password = app.config.get('SUPER_ADMIN_PASSWORD')
        
#         if not email or not password:
#             click.echo('Super admin credentials not found in environment variables!')
#             return
        
#         if User.query.filter_by(email=email).first():
#             click.echo('Super admin already exists!')
#             return
            
#         admin = User(
#             first_name=app.config.get('SUPER_ADMIN_FIRST_NAME'),
#             last_name=app.config.get('SUPER_ADMIN_LAST_NAME'),
#             email=email,
#             mobile_number='0000000000',
#             role='super_admin',
#             is_verified=True
#         )
#         admin.set_password(password)
        
#         db.session.add(admin)
#         db.session.commit() 
#         click.echo(f'Super admin {email} created successfully!')
        
#     return app

# if __name__ == '__main__':
#     app = create_app()
#     app.run(debug=True, host='0.0.0.0', port=5000)







# backend/app.py
import os
import click
from flask import Flask, send_from_directory
from flask_restx import Api
from flask_cors import CORS
# from config import Config
from .config import Config
# from models import User
from .models import User
# from extensions import db, bcrypt, mail, migrate # <-- CHANGE THIS
from .extensions import db, bcrypt, mail, migrate
# from routes.auth_routes import auth_ns
from .routes.auth_routes import auth_ns

# from routes.admin_routes import admin_ns
from .routes.admin_routes import admin_ns



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions from extensions.py
    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    migrate.init_app(app, db) # <-- CHANGE THIS
    
    # Configure CORS

    # CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
    

    CORS(app, resources={r"/api/*": {
    "origins": ["http://localhost:3000"],  # Narrow to frontend origin for security; remove "*" 
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}})
    
    # Initialize API
    api = Api(app, version='1.0', title='GalvanAI Auth API', description='A comprehensive auth API', doc='/api/docs', prefix='/api')
    
    # Register namespaces
    api.add_namespace(auth_ns, path='/auth')
    api.add_namespace(admin_ns, path='/admin')
    
    # Serve uploaded files
    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(os.path.join(app.root_path, app.config['UPLOAD_FOLDER']), filename)
    
    # CLI Commands
    @app.cli.command('create-super-admin')
    def create_super_admin():
        """Create the super admin user from .env variables."""
        email = app.config.get('SUPER_ADMIN_EMAIL')
        password = app.config.get('SUPER_ADMIN_PASSWORD')
        
        if not email or not password:
            click.echo('Super admin credentials not found in environment variables!')
            return
        
        if User.query.filter_by(email=email).first():
            click.echo('Super admin already exists!')
            return
            
        admin = User(
            first_name=app.config.get('SUPER_ADMIN_FIRST_NAME'),
            last_name=app.config.get('SUPER_ADMIN_LAST_NAME'),
            email=email,
            mobile_number='0000000000',
            role='super_admin',
            is_verified=True
        )
        admin.set_password(password)
        
        db.session.add(admin)
        db.session.commit()
        click.echo(f'Super admin {email} created successfully!')
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)


