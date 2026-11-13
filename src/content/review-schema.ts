import { z } from 'astro/zod';

/**
 * Campos del frontmatter de una reseña. Los usa la colección `reviews` de
 * `src/content.config.ts`, que añade `image` (necesita el helper `image()` de Astro),
 * y los tests, que validan los archivos sin pasar por `astro:content`.
 */
export const reviewFields = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	visitDate: z.coerce.date().optional(),
	// Precio medio por persona, en euros.
	averagePrice: z.number().positive().optional(),
	categoryArray: z.array(z.string()).default([]),
	// Las reseñas marcadas aparecen como destacadas en la portada.
	important: z.boolean().default(false),
});
