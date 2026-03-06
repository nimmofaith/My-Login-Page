from flask import Flask, jsonify
from flask_cors import CORS
from db import db
import os


def create_app():
    app = Flask(__name__, )

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
        os.path.join(app.instance_path, 'login_system.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    # Use environment variable for production
    app.config['SECRET_KEY'] = os.environ.get(
        'SECRET_KEY', 'your_secret_key_here')

    # Initialize extensions
    db.init_app(app)
    CORS(app)

    # Import models to ensure they're registered
    from models import User

    # Register blueprints
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


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # use Render's assigned port
    app.run(host="0.0.0.0", port=port, debug=False)  # debug=False for production