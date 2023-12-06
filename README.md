# Backend de Portafolio

Este proyecto es el backend de una aplicación de portafolio personal, desarrollado con Flask.

## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Lo que necesitas para instalar el software y cómo instalarlos:

- [Python](https://www.python.org/downloads/): Lenguaje de programación usado para el backend.
- [Node.js y npm](https://nodejs.org/en/download/): Node.js es el entorno de ejecución para JavaScript y npm es el gestor de paquetes.
- [MySQL](https://dev.mysql.com/downloads/installer/): Sistema de gestión de bases de datos.
- [Visual Studio Code](https://code.visualstudio.com/download): Editor de codigo

### Instalación

Una serie de pasos para que tengas un entorno de desarrollo ejecutándose:

Primero instalar el entorno virtual en caso de no tenerlo instalado(OPCIONAL)

    pip install virtualenv

Verifique que virtualenv se encuentre dentro de las variables de entorno en el PATH, si no lo hace puede que no funcione el comando siguiente

Luego crear y activar entorno virtual(OPCIONAL)(Solo si hizo el paso anterior):

    virtualenv -p python3 venv

    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

    .\venv\Scripts\activate


Instala las dependencias:

    pip install -r requirements.txt


### Base de Datos

Tener creada la base de datos en mysql workbench con el nombre de "practica3"

Modificar el archivo app.py:

    liena 7 app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://"USUARIO":"CONTRASEÑA"@localhost:3306/practica3'

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

## Configuración del Frontend

Navega al directorio del frontend:

    abre una nueva terminal:

        cd mobile

Instala las dependencias de Node.js:

        npm install

Ejecuta el servidor de desarrollo de React:

        npx expo start
        
En la misma terminal apretar "w" para ejecutar la version web, de lo contrario es necesario modificar los endpoints en app.py con su direccion ip para poder conectarse mediante la app Expo Go desde su dispositivo movil.
