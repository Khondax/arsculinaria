# ArsCulinaria

Reseñas de restaurantes de Miguel y Lucía. Páginas: portada (destacadas, favoritos y últimas), reseñas,
categorías (`/categorias`), buscador con mapa (`/buscador`), «Por visitar» (`/suggestions`), recetas y
sobre nosotros.

# Recursos empleados para agentes
## Habilidades:
### Rendimiento:
- `karpathy-guidelines` (multica-ai/andrej-karpathy-skills)
### Buenas prácticas y patrones de programación:
- `nodejs-backend-patterns` (wshobson/agents)
- `nodejs-best-practices` (sickn33/antigravity-awesome-skills)
- `tailwind-css-patterns` (giuseppe-trisciuoglio/developer-kit)
- `typescript-advanced-types` (wshobson/agents)
- `vitest` (antfu/skills)
- `seo` (addyosmani/web-quality-skills)
- `deploy-to-vercel` (vercel-labs/agent-skills)
### Diseño:
- `accessibility` (addyosmani/web-quality-skills)
- `astro` (astrolicious/agent-skills)
- `design-taste-frontend` (Leonxlnx/taste-skill)

## MCPs:
- `Stitch` -> Para diseño del frontal

## Herramientas:
- `Codegraph` -> Para crear una base de conocimientos indexados y reducir el uso de tokens
- `Improve` -> Para elaborar planes de mejora (Shadcn/improve)

# Tareas pendientes ✅❌
- ✅❌ Retocar la landing page, poner las 10 últimas reseñas destacadas?
- ✅ Buscador con filtros (nombre, localidad, categoría, precio y orden), «Sorpréndeme» y mapa
- ❌ Mejorar estilos y "sobre nosotros", añadir info sobre nosotros pero yo no se si quiero mi perfil
      en redes (aunque se pueda alcanzar)
- ✅❌ Integración con redes sociales: compartir y publicación de Instagram en cada reseña; faltan
      las visualizaciones (configurar `INSTAGRAM_ACCESS_TOKEN` en Vercel)
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

El directorio `src/content/` contiene las colecciones de Markdown y MDX: `reviews/`, `suggestions/` (restaurantes
por visitar) y `recipes/`. Los esquemas están en `src/content.config.ts`, que reutiliza los campos de
`review-schema.ts` y `suggestion-schema.ts`. Las funciones para leerlas están en `src/lib/content.ts`. Aquí la
documentación [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/).

Las imágenes de reseñas y recetas van en `src/assets/images/` para que Astro las optimice
(redimensiona y convierte a WebP). Los ficheros que deban servirse tal cual (favicon, etc.) van en `public/`.

## ✍️ Añadir una reseña o una sugerencia

Copia la plantilla de `src/content/templates/` (`restaurant-review-template.md` o
`restaurant-suggestion-template.md`) en `src/content/reviews/` o `src/content/suggestions/`. El nombre del
fichero será la URL. Lo mínimo de una reseña:

```markdown
---
title: 'Casa Romántica'
description: 'Una frase que resuma la experiencia.'
address: 'Paseo Marítimo, 15'
locality: 'Gran Canaria'
pubDate: '2025-10-10'
image: '../../assets/images/restaurants/casa-romantica.jpg' # opcional, ruta relativa
rating:                                                     # opcional, de 1 a 10
  food: 9
  service: 9
  ambiance: 8
  value: 9
---

Texto de la reseña en Markdown…
```

Campos opcionales:

- `visitDate`, `updatedDate` y `averagePrice` (€ por persona, se muestra como rango de € a €€€€).
- `categoryArray`: alimenta el buscador y las páginas de `/categorias`.
- `important`: sale en «Destacadas». `favorite`: sale en el carrusel de favoritos. `trending`: etiqueta «Tendencia».
- `rating`: la ficha muestra cada aspecto, la media y un veredicto. La media aparece en tarjetas y buscador.
- `coordinates` (`lat`, `lng`): sitúa la reseña en el mapa del buscador.
- `restaurantLinks` (`website`, `reservations`, `menu`, `instagram`, `googleMaps`) y `anecdote`.
- `instagramPostId`: el código tras `/p/` en la URL de la publicación. Incrusta la publicación y, si
  `INSTAGRAM_ACCESS_TOKEN` está configurado (ver `.env.example`), sus visualizaciones mediante
  `/api/instagram-views`. Es la única ruta que no es estática: corre como función de Vercel.


## 🧞 Comandos

Todos los comandos se ejecutan desde la raiz del proyecto, en una terminal indica:

| Command                   | Action                                                       |
| :------------------------ | :----------------------------------------------------------- |
| `pnpm install`            | Instala dependencias                                         |
| `pnpm dev`                | Inicia el servidor local de desarrollo en `localhost:4321`   |
| `pnpm build`              | Compila la versión de producción en `./.vercel/output/`      |
| `pnpm test`               | Ejecuta los tests en modo watch (Vitest)                     |
| `pnpm test:run`           | Ejecuta los tests una sola vez                               |
| `pnpm check`              | Comprueba tipos y errores en los ficheros `.astro` y `.ts`   |
| `pnpm astro ...`          | Ejecuta comandos de Astro como `astro add...`, `astro check` |

El build usa el adaptador de Vercel (con Web Analytics), que no admite `astro preview`. Los tests de
`src/content/collections.test.ts` validan el frontmatter de cada reseña y sugerencia contra sus esquemas
compartidos y comprueban que sus imágenes existen. `src/lib/rating.test.ts` cubre la nota media, el veredicto
y los slugs de categoría. El CI (`.github/workflows/ci.yml`) ejecuta `check`, `test:run` y `build`.


## Créditos

Construida con [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) y
[Leaflet](https://leafletjs.com) con mapas de [OpenStreetMap](https://www.openstreetmap.org). Tipografías
[Fraunces](https://fonts.google.com/specimen/Fraunces) e [Inter](https://rsms.me/inter/), servidas
localmente con Fontsource.