# ARS CULINARIA

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
| `pnpm install`            | Instala dependencias                                         |
| `pnpm dev`                | Inicia el servidor local de desarrollo en `localhost:4321`   |
| `pnpm build`              | Compila la versión de producción en `./.vercel/output/`      |
| `pnpm test`               | Ejecuta los tests en modo watch (Vitest)                     |
| `pnpm test:run`           | Ejecuta los tests una sola vez                               |
| `pnpm check`              | Comprueba tipos y errores en los ficheros `.astro` y `.ts`   |
| `pnpm astro ...`          | Ejecuta comandos de Astro como `astro add...`, `astro check` |

El build usa el adaptador de Vercel (con Web Analytics), que no admite `astro preview`. Los tests de
`src/content/reviews.test.ts` validan el frontmatter de cada reseña contra el esquema compartido de
`src/content/review-schema.ts`. El CI (`.github/workflows/ci.yml`) ejecuta `check`, `test:run` y `build`.


## Créditos

Construida con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com). Tipografías
[Fraunces](https://fonts.google.com/specimen/Fraunces) e [Inter](https://rsms.me/inter/), servidas
localmente con Fontsource.