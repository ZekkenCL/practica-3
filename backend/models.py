from extensions import db

class User(db.Model):
    rut = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    summary = db.Column(db.Text)
    frameworks = db.relationship('Framework', backref='user', lazy=True)
    hobbies = db.relationship('Hobby', backref='user', lazy=True)

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "city": self.city,
            "country": self.country,
            "summary": self.summary,
            "frameworks": [framework.to_dict() for framework in self.frameworks],
            "hobbies": [hobby.to_dict() for hobby in self.hobbies]
        }

class Framework(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    level = db.Column(db.String(100))
    user_rut = db.Column(db.String(12), db.ForeignKey('user.rut'))
    def to_dict(self):
        return {"name": self.name, "level": self.level}

class Hobby(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user_rut = db.Column(db.String(12), db.ForeignKey('user.rut'))
    def to_dict(self):
        return {"name": self.name}

