# Backend de Portafolio

Este proyecto es el backend de una aplicación de portafolio personal, desarrollado con Flask.

## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Lo que necesitas para instalar el software y cómo instalarlos:

- Python 3
- Flask
- Un entorno virtual de Python
- MySql Workbench

### Instalación

Una serie de pasos para que tengas un entorno de desarrollo ejecutándose:

Primero instalar el entorno virtual en caso de no tenerlo instalado

    pip install virtualenv

Luego crear y activar entorno virtual:

    virtualenv -p python3 venv

    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

    .\venv\Scripts\activate


Instala las dependencias:

    pip install -r requirements.txt


### Base de Datos

Tener creada la base de datos en mysql workbench con el nombre de "practica2"

Modificar el archivo app.py:

    liena 7 app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://"USUARIO":"CONTRASEÑA"@localhost:3306/practica2'

    modificar USUARIO y CONTRASEÑA con sus datos para ingresar a la base de datos

Migrar base de datos:

    flask db init
    flask db migrate
    flask db upgrade

Poblar base de datos con seed:

    python seed.py

### Ejecucion

Ejecutar backend

    python app.py

El proyecto debería estar ahora ejecutándose en `localhost:5000/api/profile`.
