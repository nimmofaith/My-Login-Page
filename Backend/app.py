import os
from flask import Flask, jsonify
from flask_cors import CORS
from db import db

def create_app():
    app = Flask(__name__)

    # Use /tmp for SQLite on Render
    db_path = os.path.join('/tmp', 'login_system.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Secret key from environment variable
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_secret_key_here')

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    # Import models and blueprints
    from models import User
    from routes import auth_bp
    app.register_blueprint(auth_bp)

    # Root route
    @app.route('/')
    def index():
        return jsonify({'message': 'Login System API is running successfully!'}), 200

    # Create database tables
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)