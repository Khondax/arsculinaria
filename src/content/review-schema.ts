import { z } from 'astro/zod';

/** Puntuación de cada aspecto, de 1 a 10. */
export const ratingSchema = z.object({
	food: z.number().min(1).max(10),
	service: z.number().min(1).max(10),
	ambiance: z.number().min(1).max(10),
	value: z.number().min(1).max(10),
});

/** Enlaces del restaurante. Todos opcionales. */
export const restaurantLinksSchema = z.object({
	website: z.string().url().optional(),
	reservations: z.string().url().optional(),
	menu: z.string().url().optional(),
	instagram: z.string().url().optional(),
	googleMaps: z.string().url().optional(),
});

/** Coordenadas para situar el restaurante en el mapa del buscador. */
export const coordinatesSchema = z.object({
	lat: z.number().min(-90).max(90),
	lng: z.number().min(-180).max(180),
});

/**
 * Campos del frontmatter de una reseña. Los usa la colección `reviews` de
 * `src/content.config.ts`, que añade `image` (necesita el helper `image()` de Astro),
 * y los tests, que validan los archivos sin pasar por `astro:content`.
 */
export const reviewFields = z.object({
	title: z.string(),
	description: z.string(),
	address: z.string(),
	locality: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	visitDate: z.coerce.date().optional(),
	// Precio medio por persona, en euros.
	averagePrice: z.number().positive().optional(),
	categoryArray: z.array(z.string()).default([]),
	// Las reseñas marcadas aparecen como destacadas en la portada.
	important: z.boolean().default(false),
	// Las favoritas aparecen en el carrusel de la portada.
	favorite: z.boolean().default(false),
	trending: z.boolean().default(false),
	// Código de la publicación de Instagram: lo que va tras `/p/` en su URL.
	instagramPostId: z.string().optional(),
	rating: ratingSchema.optional(),
	restaurantLinks: restaurantLinksSchema.optional(),
	coordinates: coordinatesSchema.optional(),
	anecdote: z.string().optional(),
});
