import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			visitDate: z.coerce.date().optional(),
			// Ruta relativa a una imagen de `src/assets/` para que Astro la optimice.
			image: image().optional(),
			// Precio medio por persona, en euros.
			averagePrice: z.number().positive().optional(),
			categoryArray: z.array(z.string()).default([]),
			// Las reseñas marcadas aparecen como destacadas en la portada.
			important: z.boolean().default(false),
		}),
});

const recipes = defineCollection({
	loader: glob({ base: './src/content/recipes', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			image: image().optional(),
		}),
});

export const collections = { reviews, recipes };
