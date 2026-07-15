# Confecciones Lina - Despliegue en la web

Este proyecto es un sitio estático simple listo para publicar en la web.

## Archivos principales
- `index.html`
- `cart.html`
- `gallery.html`
- `owner.html`
- `styles.css`
- `script.js`

## Opción 1: Subir a GitHub Pages

### Requisitos
- Una cuenta en GitHub
- Git instalado en tu máquina

### Pasos
1. Crea un repositorio nuevo en GitHub.
2. En tu carpeta del proyecto, abre PowerShell o terminal y ejecuta:

   ```powershell
   cd c:\Users\yerli\lina
   git init
   git add .
   git commit -m "Publicar sitio Lina"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/NOMBRE_DEL_REPO.git
   git push -u origin main
   ```

3. Ve al repositorio en GitHub.
4. Abre `Settings` > `Pages`.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera unos minutos.
7. Tu sitio quedará publicado en una URL como `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

## Opción 2: Publicar con Netlify

1. Ve a https://www.netlify.com/
2. Crea una cuenta o ingresa.
3. Usa la función de "Drag & drop" para arrastrar la carpeta `lina` directamente a Netlify.
4. Netlify generará una URL pública y quedará disponible inmediatamente.

## Opción 3: Publicar con Vercel

1. Ve a https://vercel.com/
2. Inicia sesión con GitHub, GitLab o Bitbucket.
3. Conecta el repositorio y elige el proyecto.
4. Vercel detecta que es un sitio estático y lo publica automáticamente.

## Opción 4: Subir a un hosting estático directo

Puedes usar servicios como Surge, Firebase Hosting o Neocities. Solo necesitas subir los archivos estáticos.

## Consejos
- Mantén todos los archivos juntos en la misma carpeta.
- Si usas GitHub Pages, no necesitas backend ni servidor adicional: es solo HTML/CSS/JS.
- Si no tienes Git instalado, Netlify Drop es la forma más rápida.

## Nota
El sitio ya está preparado para subirlo tal cual. Si quieres, te ayudo a crear el repositorio de GitHub y te explico cómo hacer el primer push paso a paso.
