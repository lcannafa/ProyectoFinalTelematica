# NodeJS GEOLOCALIZACION

# Descripción de aplicación

Aplicación web que permite ver mi locación brindada desde un dispositivo móvil accediendo por medio del navegador o usando un portátil que permita compartir la ubicación.

# 1. Análisis

## 1.1 Requisitos funcionales:

1. Guardar mi posición actual
2. Consultar y plotear en un mapa mi posición

## 1.2 Definición de tecnología de desarrollo y despliegue para la aplicación:

* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: no se usa - se utilizará Templates HTML para Vista (V) EJS
* Base de datos: MongoDB
* Web App Server: NodeJS
* Web Server: NGINX y Apache Web Server

# 2. Diseño:

## 2.1 Modelo de datos:

user:

{
    local:
    {
        email : String,
        password: String
    }
}

location:

{
    user : String,
    date : { type: Date, default: Date.now },
    latitud: String,
    longitud: String
}

## 2.2 Servicios Web

    1. http://server/singup

    Método: GET

    Descripción:  Crear cuenta de autentificación.

    2. http://server/login

    Método: GET

    Descripción:  Autentificación de usuario.

    3. http://server/AddLoc

    Método: POST

    Descripción:  Guardar localización actual del dispositivo.

    Datos de entrada:

      user, latitud, longitud, timestamp

    Datos de salida:

      Copia en JSON guardado en la base de datos.
      ej: [{"user":"juanpablo.calad@hotmail.com","latitud":6.217,"longitud":-75.567 "timestamp":"2018-02-15T18:03:00.000Z"]

    4. http://server/singup

    Método: GET

    Descripción:  Mostrar ubicación en mapa.

# 3. Despligue en un Servidor Centos 7.x en el DCA


## se instala nvm local para el usuario


## se instala el servidor mongodb

como root:

      user1$ sudo yum install mongodb-server -y

ponerlo a correr:

      user1$ sudo systemctl enable mongod
      user1$ sudo systemctl start mongod


## se instala NGINX

      user1$ sudo yum install nginx
      user1$ sudo systemctl enable nginx
      user1$ sudo systemctl start nginx

Abrir el puerto 80 y 3000

      user1$ sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
      user1$ sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent
      user1$ sudo firewall-cmd --reload
      user1$ sudo firewall-cmd --list-all


## se instala Apache Web Server

      user1$ sudo yum install httpd

## se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

      user1$ npm install -g pm2
      user1$ cd src
      user1$ pm2 start server.ps
      user1$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:    

      user1$ sudo pm2 startup systemd

### Configuración del proxy inverso en NGINX para cada aplicación:

      // /etc/nginx/nginx.config
      .
      .
      server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;
      .
      .
      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 2
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
      .
      .       
