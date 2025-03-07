# Tienda-Online

## Credenciales por defecto

- **Email:** admin@gmail.com
- **Contraseña:** Admin98!

## Facturas

- Las facturas se generan dentro del proyecto en public/docs

## Cómo iniciar el proyecto

1. Clona el repositorio:
    ```bash
    git clone https://github.com/JodFimu/Tienda-Online.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd Tienda-Online
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Configura las variables de entorno (crea un archivo `.env` si no existe y añade las variables necesarias):
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/tienda-online2023015
    ```

5. Inicia el proyecto:
    ```bash
    node --watch index.js
    ```

6. El proyecto estará disponible en `http://localhost:3000`