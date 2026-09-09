# Hospital Palmas — Website premium

Sitio estático **mobile-first**, preparado para Visual Studio Code y GitHub Pages. No necesita framework ni proceso de compilación.

## Estructura

```text
hospital-palmas-web/
├── index.html
├── 404.html
├── manifest.webmanifest
├── robots.txt
├── data/
│   └── site.json
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── modules/
│   ├── js/
│   │   ├── app.js
│   │   └── modules/
│   └── img/
│       ├── hero-hospital-palmas.*
│       └── icons/*.png
└── tools/
    └── dev_server.py
```

## Abrir en VS Code

1. Abra la carpeta `hospital-palmas-web` en VS Code.
2. Para una vista fiel a GitHub Pages, ejecute:

```bash
python tools/dev_server.py
```

3. Abra `http://localhost:8000`.

> Abrir `index.html` con doble clic puede impedir que `fetch('./data/site.json')` funcione por restricciones de `file://`. El HTML incluye datos de respaldo, pero para probar el JSON use el servidor local o Live Server.

## GitHub Pages

Todos los assets internos usan **rutas relativas** (`./assets/...`, `./data/...`), por lo que el sitio funciona tanto en:

- `usuario.github.io/`
- `usuario.github.io/nombre-del-repo/`
- dominio personalizado

Publicación sugerida:

1. Crear el repositorio.
2. Subir el contenido de esta carpeta a la rama `main`.
3. GitHub → **Settings → Pages**.
4. Source: `Deploy from a branch` → `main` → `/ (root)`.

## Datos que deben confirmarse antes de publicar

Revise `data/site.json`:

- Teléfono principal: `777 314 0974`.
- Teléfono alterno: `777 312 3534`.
- El WhatsApp está configurado provisionalmente con el teléfono principal. **Confirmar con Hospital Palmas que ese número sí recibe WhatsApp.**
- La captura de Street View entregada muestra `94 Blvd. Lic. Benito Juárez`; confirmar domicilio oficial/fiscal antes de publicar.
- Los servicios son contenido de wireframe. Validar denominaciones y disponibilidad con el Dr. Campos.

## CSS modular

`assets/css/main.css` solamente importa módulos con `@import`:

- `tokens.css`: paleta, espaciado, radios y sombras.
- `reset.css`: normalización.
- `base.css`: tipografía, accesibilidad, glassmorphism.
- `header.css`: navegación.
- `hero.css`: hero arquitectónico.
- `components.css`: botones, cards, iconografía.
- `sections.css`: secciones de contenido.
- `responsive.css`: breakpoints, iPhone/Safari, Android y reduced motion.

## Compatibilidad

Diseñado para navegadores modernos y con medidas específicas para:

- Safari iPhone / iOS (`viewport-fit=cover`, safe areas, `-webkit-backdrop-filter`, `svh`).
- Chrome Android.
- Safari macOS.
- Chrome / Edge desktop.
- Touch targets de ~48–52 px.
- `prefers-reduced-motion`.
- Navegación por teclado y focus visible.

## Python

GitHub Pages es hosting estático, así que **Python no corre en producción**. `tools/dev_server.py` existe únicamente para revisión local sin CORS y para facilitar el trabajo en VS Code.
