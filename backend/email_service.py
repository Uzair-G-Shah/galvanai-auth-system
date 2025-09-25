
# # backend\email_service.py
# from flask_mail import Mail, Message
# from flask import current_app

# mail = Mail()

# def send_otp_email(email, otp_code, first_name):
#     try:
#         msg = Message(
#             'Email Verification - GalvanAI',
#             sender=current_app.config['MAIL_DEFAULT_SENDER'],
#             recipients=[email]
#         )
        
#         msg.html = f"""
#         <html>
#             <body style="font-family: Arial, sans-serif;">
#                 <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
#                     <h2 style="color: #333;">Email Verification</h2>
#                     <p>Hello {first_name},</p>
#                     <p>Your verification code is:</p>
#                     <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
#                         {otp_code}
#                     </div>
#                     <p>This code will expire in 10 minutes.</p>
#                     <p>If you didn't request this verification, please ignore this email.</p> 
#                     <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;"> 
#                     <p style="color: #666; font-size: 12px;">This is an automated message from GalvanAI</p>
#                 </div>
#             </body>
#         </html>
#         """
        
#         mail.send(msg)
#         return True
#     except Exception as e:
#         print(f"Failed to send email: {str(e)}")
#         return False
    





# backend/email_service.py
from flask_mail import Message # <-- CHANGE THIS LINE
from flask import current_app
from .extensions import mail # <-- ADD THIS LINE

# mail = Mail() <-- REMOVE THIS LINE

def send_otp_email(email, otp_code, first_name):
    # ... the rest of the file remains exactly the same
    try:
        msg = Message(
            'Email Verification - GalvanAI',
            sender=current_app.config['MAIL_DEFAULT_SENDER'],
            recipients=[email]
        )
        
        msg.html = f"""
        <html>
            <body style="font-family: Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">Email Verification</h2>
                    <p>Hello {first_name},</p>
                    <p>Your verification code is:</p>
                    <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 3px; margin: 20px 0;">
                        {otp_code}
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't request this verification, please ignore this email.</p>
                    <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 12px;">This is an automated message from GalvanAI</p>
                </div>
            </body>
        </html>
        """
        
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False
    

    