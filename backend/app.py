from flask import Flask, jsonify, request
from extensions import db, migrate
from models import User, Framework, Hobby
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:beno1989@localhost:3306/practica3'

db.init_app(app)
migrate.init_app(app, db)
CORS(app)

@app.route('/api/profile', methods=['GET'])
def get_profile():
    user = User.query.first()
    return jsonify(user.to_dict())

@app.route('/api/profile/<rut>', methods=['PUT'])
def update_profile(rut):
    user = User.query.filter_by(rut=rut).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    # Actualizar los campos del usuario
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.city = data.get('city', user.city)
    user.country = data.get('country', user.country)
    user.summary = data.get('summary', user.summary)

    # Actualizar los frameworks
    if 'frameworks' in data:
        Framework.query.filter_by(user_rut=user.rut).delete()
        for framework_data in data['frameworks']:
            framework = Framework(name=framework_data['name'], level=framework_data['level'], user_rut=user.rut)
            db.session.add(framework)

    # Actualizar los hobbies
    if 'hobbies' in data:
        Hobby.query.filter_by(user_rut=user.rut).delete()
        for hobby_data in data['hobbies']:
            hobby = Hobby(name=hobby_data['name'], user_rut=user.rut)
            db.session.add(hobby)

    db.session.commit()
    return jsonify(user.to_dict()), 200


if __name__ == '__main__':
    app.run(debug=True)
