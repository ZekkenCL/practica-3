from app import app
from extensions import db
from models import User, Framework, Hobby

def add_seed_data():
    # Crear instancia de usuario
    user = User(
        rut="12345678-9",
        name="Benito Segundo Muñoz Alvarez",
        email="benito.munoz@alumnos.ucn.cl",
        city="Chañaral",
        country="Chile",
        summary="Estudiante de La universidad Catolica del Norte interesado en el desarrollo web y movil"
    )

    # Añadir Frameworks

    frameworks = [
        Framework(name="Laravel", level="30%", user_rut=user.rut),
        Framework(name="PowerBI", level="60%", user_rut=user.rut),
        Framework(name="Python", level="75%", user_rut=user.rut)
    ]



    # Añadir Hobbies
    hobbies = [
        Hobby(name="E-Sports", user_rut=user.rut),
        Hobby(name="Anime", user_rut=user.rut),
        Hobby(name="Musica", user_rut=user.rut)
    ]

    # Añadir a la sesión de la base de datos
    db.session.add(user)
    db.session.add_all(frameworks)
    db.session.add_all(hobbies)

    # Commit a la base de datos
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        add_seed_data()
