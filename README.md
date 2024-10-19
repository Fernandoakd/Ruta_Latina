# Ruta Latina

**Ruta Latina** es una página web desarrollada para una agencia de viajes, enfocada en ofrecer paquetes turísticos por toda Latinoamérica. La aplicación está desarrollada con **ReactJS** y hace uso de las librerías **react-icons** y **react-router-dom**.

## Descripción

Este proyecto consiste en el desarrollo del frontend de una página web de una agencia de viajes. Los usuarios pueden buscar destinos, visualizar paquetes turísticos y filtrarlos según varios parámetros, como ubicación y precio.

## Tecnologías utilizadas

- **ReactJS**: para la creación de componentes y manejo del frontend.
- **react-icons**: para incluir iconos en la interfaz.
- **react-router-dom**: para la navegación entre páginas.
- **Vercel**: el proyecto será desplegado en esta plataforma para que los usuarios puedan acceder a él en línea.

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos:

- Node.js (versión 14 o superior)
- npm (Node Package Manager)

## Instalación y ejecución

Para clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio en tu computadora:
    ```bash
    git clone https://github.com/Fernandoakd/Ruta_Latina.git
    ```

2. Navega hasta el directorio del proyecto:
    ```bash
    cd Ruta_Latina
    ```

3. Instala las dependencias del proyecto:
    ```bash
    npm i
    ```

4. Ejecuta el proyecto en modo de desarrollo:
    ```bash
    npm run dev
    ```

5. Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en funcionamiento, si esta URL no funciona, verificar el puerto en el cual generó la vista de la página en la terminal. Es importante aclarar que para que la aplicación funcione en vercel. En los archivos "mainStatisticsFetching.js" y "packagesFetching.js" se modifico la URL de `http://localhost:5173` por `https://ruta-latina.vercel.app`.

## Despliegue

El proyecto se encuentra desplegado en [Vercel](https://vercel.com/). Podrás acceder a la aplicación en línea a través de este enlace: [Ruta Latina en Vercel](https://ruta-latina.vercel.app).

## Estructura del Proyecto

El proyecto sigue la estructura estándar de React. Los componentes principales incluyen:

- `App.jsx`: Componente que contiene el enrutamiento de las distintas páginas.
- `Home.jsx`: Página principal donde se visualiza la información de la empresa y la lista de destinos populares.
- `Packages.jsx`: Página que muestra la lista de destinos y su información.
- `DetailsPack.jsx`: Página que muestra la información del destino seleccionado y un formulario para solicitar más información.

Cada uno de ellos posee componentes que contienen la estructura de las páginas.

## Contribuciones

Este proyecto está abierto a contribuciones. Si deseas colaborar, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de mi perfil de GitHub.

---

¡Gracias por visitar Ruta Latina!
