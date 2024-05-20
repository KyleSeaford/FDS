import smtplib
from email.mime.text import MIMEText

def send(message_message, message_subject):
    sender = 'contact@kyle-seaford.co.uk' # senders email address
    receivers = ['projects@kyle-seaford.co.uk'] # recipient email address

    # email details for sender account
    smtp_server = 'smtp.ionos.co.uk' 
    smtp_port = 587
    smtp_username = 'contact@kyle-seaford.co.uk' # senders email address
    smtp_password = '' # senders email password

    # Build the message with MIMEText for proper formatting
    # body of the email
    message = MIMEText(message_message)
    message['Subject'] = message_subject
    message['From'] = sender
    message['To'] = ', '.join(receivers)

    try:
        smtpObj = smtplib.SMTP(smtp_server, smtp_port)
        smtpObj.starttls()  
        
        smtpObj.login(smtp_username, smtp_password)
        
        smtpObj.sendmail(sender, receivers, message.as_string())
        print("Successfully sent email")

    except smtplib.SMTPException as e:
        print(f"Error: {e}")