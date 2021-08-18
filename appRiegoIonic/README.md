Bienvenidos a nuestro repositorio de código!!!
En este caso, nos encontramos realizando un trabajo práctico para la Especialización en IoT de la Universidad de Buenos Aires.
A través de estas líneas de código podrás levantar una página web para el monitoreo de una Aplicaciòn de Riego.
Sin más preámbulos, los dejamos con la guía de instalación y puesta en marcha.

Indice de contenidos:
- [Instalación](#instalación)
- [Frontend](#frontend)
- [Backend](#backend)
- [Base de datos](#base-de-datos)
- [Licencia](#licencia)

# Instalación 
Para la instalación necesitaremos ejecutar los comandos que se describen a continuación para cada una de las correspondientes tareas.

Descargar del siguiente repositorio los archivos de la aplicación web y copiarlos en una carpeta de su preferencia.
https://github.com/innoligentdeveloper/dam.git

Dentro de esos archivos descargados encontraremos la carpeta /appRiegoIonic. Esta carpeta es la que utilizaremos para este pràctico.
En nuestro caso la copiaremos a modo de ejemplo en 'cd /home/usuario/appRiegoIonic'. Donde 'usuario' debe reemplazarse por el nombre de usuario correspondiente de la terminal linux.

Instalación de Docker:

Se instalará docker y docker-compose, teniendo en cuenta que la distribución Linux deberá ser debian 9 o superior.
```sh
sudo apt-get update 
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```
Importar clave y verificar huella
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
```
Agregar repositorio de docker e instalar
```sh
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
Configurar permisos y grupo
```sh
sudo groupadd docker
sudo usermod -aG docker $USER
sudo gpasswd -a $USER docker
```
Reiniciar servicio
```sh
sudo service docker restart
```
Verificar la instalación
```sh
sudo docker run hello-world
```
Si la instalación ha concluido exitosamente, se mostrará por consola el mensaje de saludo del hello-world.


Instalar ahora el Docker-compose:

Descargar y dar permisos al programa
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
``` 
Verificar la versión
```sh
docker-compose --version
```
Deberá mostrarse la versión `1.26.2`

A continuación se deberá reiniciar el sistema.
```sh
sudo reboot
```

Descargar imágenes:

Se deberán descargar las siguientes imágenes de docker para que nuestra aplicación pueda correr.

```sh
docker pull harmish/typescript
docker pull mysql:5.7
docker pull phpmyadmin/phpmyadmin
docker pull abassi/nodejs-server:10.0-dev
```
Una vez finalizada la descarga, se deberá levantar el servicio de docker desde la ruta de la carpeta del fork, por ejemplo 'cd /home/usuario/appRiegoIonic'.

```sh
docker-compose up
```

Esto iniciará los siguientes servicios:
- Mysql server
- PhpMyadmin
- NodeJs server y monitor
- Monitor de Typescript

Otros comandos útiles de docker-compose que cabe destacar (solo para referencia):

Para iniciar docker compose:
```sh 
docker-compose up
```
Para ver los procesos:
```sh 
docker-compose ps
```
Para detener el servicio:
```sh 
docker-compose stop
```
Para reiniciar el servicio:
```sh 
docker-compose restart
```

# Frontend
Una vez realizada la instalación anterior, ingrese desde un navegador de internet a la url: http://localhost:8000 para visualizar la página web.

Para el frontend del sistema se utilizó el framework Ionic (https://ionicframework.com/)
Para la programación se utilizó Typescript y HTML.

La funcionalidad del sistema es visualizar la información de los distintos sensores de riego, además de poder encender y apagar la electroválvula para irrigar el sistema. Para cada sensor se puede visualizar la historia de encendido y apagado de la electroválvula, como así también visualizar los valores de irrigación en vivo e históricos.

En este caso no es necesario instalar Ionic dado que ya está hecho el build y copiado en la carpeta /src/frontend/www/

Si se deseara modificar el código Ionic se debe instalar Ionic y utilizar el código que se encuentra en la carpeta /app_IONIC_RIEGO_DESARROLLO. 

Para instalar Ionic debe seguir los siguientes pasos desde la consola.

```sh 
npm install -g @ionic/cli
```
Si desea modificar la app, ingrese a la carpeta de la misma y encienda el server de ionic:
```sh 
cd /app_IONIC_RIEGO_DESARROLLO
ionic serve
```
Ahora puede modificar el código e ir viendo los cambios en la web.

Una vez finalizadas las modificaciones, se debe hacer el build de la aplicaciòn.
```sh 
ionic build
```
Ahora hay que proceder a borrar todo el contenido existente en /src/frontend/www.
Finalmente, proceder a copiar toda la carpeta /www en el /src/frontend/www

# Backend
En el lado del backend se programaron las llamadas a la base de datos para que se inserten y actualicen los datos de los sensores. También se realiza el envío de la respuesta al frontend con los datos necesarios en formato JSON.

En el código se podrán observar todos los métodos encargados de guardar los datos provenientes del frontend.

# Base de datos
Como vimos anteriormente en la instalación, se utiliza una base de datos MySQL que consta de cuatro tablas llamadas `Dispositivos`, `Electrovalvulas`, `Log_Riegos` y `Mediciones`.
Cada una con los siguientes campos:

Tabla Dispositivos:
  `dispositivoId` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `ubicacion` varchar(200) DEFAULT NULL,
  `electrovalvulaId` int(11) NOT NULL

Tabla Electrovalvulas: 
  `electrovalvulaId` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL

Tabla Log_Riegos: 
  `logRiegoId` int(11) NOT NULL,
  `apertura` tinyint(4) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `electrovalvulaId` int(11) NOT NULL

Tabla Mediciones: 
  `medicionId` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `valor` varchar(100) DEFAULT NULL,
  `dispositivoId` int(11) NOT NULL


Con las siguientes relaciones entre tablas:
Indices de la tabla `Dispositivos`:
  ADD PRIMARY KEY (`dispositivoId`,`electrovalvulaId`),
  ADD KEY `fk_Dispositivos_Electrovalvulas1_idx` (`electrovalvulaId`);

Indices de la tabla `Electrovalvulas`:
  ADD PRIMARY KEY (`electrovalvulaId`);

Indices de la tabla `Log_Riegos`:
  ADD PRIMARY KEY (`logRiegoId`,`electrovalvulaId`),
  ADD KEY `fk_Log_Riegos_Electrovalvulas1_idx` (`electrovalvulaId`);

Indices de la tabla `Mediciones`:
  ADD PRIMARY KEY (`medicionId`,`dispositivoId`),
  ADD KEY `fk_Mediciones_Dispositivos_idx` (`dispositivoId`);
  
Para acceder al administrador de base de datos phpmyadmin, ingrese desde un navegador de internet a la url http://localhost:8001 con usuario 'root' y contraseña 'userpass'.

# Licencia
Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE](LICENSE) para más detalles sobre el uso de este material.

