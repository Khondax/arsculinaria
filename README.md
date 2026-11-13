# Tareas pendientes ✅❌
- ✅❌ Retocar la landing page, poner las 10 últimas reseñas destacadas?
- ✅ Buscador con filtros (nombre, categoría, precio y orden) · ❌ mapa
- ❌ Mejorar estilos y "sobre nosotros", añadir info sobre nosotros pero yo no se si quiero mi perfil
      en redes (aunque se pueda alcanzar)
- ❌ Integración con redes sociales?
- ❌ Despliegue automático en vercel/otros? con github actions
- ❌ Añadir métricas de uso/clicks


## 🚀 Estructura del proyecto

Dentro del proyecto de Astro se encuentran las siguientes carpetas y ficheros:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro busca los ficheros `.astro` o `.md` en `src/pages/`. Cada página se expone como una ruta en función de su nombre de fichero.

En la carpeta `src/components/` se cargarán los diferentes componentes como `header`, `footer` o las tarjetas (de Astro) como `CardReview`, pero admite cualquier componente de Astro/React/Vue/Svelte/Preact.

El directorio `src/content/` contiene "colecciones" de documentos Markdown y MDX. Usa `getCollection()` para obtener los posts de `src/content/reviews/`. Recuerda verificar el esquema y lo ideal es usar un tipado fuerte. Aquí la documentación [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/).

Las imágenes de reseñas y recetas van en `src/assets/images/` para que Astro las optimice
(redimensiona y convierte a WebP). Los ficheros que deban servirse tal cual (favicon, etc.) van en `public/`.

## ✍️ Añadir una reseña

Crea un fichero en `src/content/reviews/` (el nombre del fichero será la URL):

```markdown
---
title: 'Casa Romántica'
description: 'Una frase que resuma la experiencia.'
pubDate: '2025-10-10'
visitDate: '2025-10-04'                         # opcional
image: '../../assets/images/casa-romantica.jpg' # opcional, ruta relativa
averagePrice: 50                                # opcional, € por persona
categoryArray: ['mediterráneo', 'fusión']       # opcional
important: true                                 # opcional, aparece en «Destacadas»
---

Texto de la reseña en Markdown…
```

Las categorías alimentan los filtros del buscador, y el precio medio se muestra como rango (€ – €€€€).


## 🧞 Comandos

Todos los comandos se ejecutan desde la raiz del proyecto, en una terminal indica:

| Command                   | Action                                                       |
| :------------------------ | :----------------------------------------------------------- |
| `npm install`             | Instala dependencias                                         |
| `npm run dev`             | Inicia el servidor local de desarrollo en `localhost:4321`   |
| `npm run build`           | Compila la versión de producción en `./dist/`                |
| `npm run preview`         | Vista previa de tu build, antes del despliegue               |
| `npm run check`           | Comprueba tipos y errores en los ficheros `.astro` y `.ts`   |
| `npm run astro ...`       | Ejecuta comandos de Astro como `astro add...`, `astro check` |
| `npm run astro -- --help` | Obtiene ayuda de los comandos de Astro                       |


## Créditos

Construida con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com). Tipografías
[Fraunces](https://fonts.google.com/specimen/Fraunces) e [Inter](https://rsms.me/inter/), servidas
localmente con Fontsource.