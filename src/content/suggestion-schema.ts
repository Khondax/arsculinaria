import { z } from 'astro/zod';
import { coordinatesSchema, restaurantLinksSchema } from './review-schema';

/**
 * Campos de una sugerencia: un restaurante que nos han recomendado y todavía no hemos visitado.
 * Comparte enlaces y coordenadas con las reseñas, pero no tiene nada que dependa de haber ido
 * (puntuación, fecha de visita, precio). Como en las reseñas, `image` lo añade la colección.
 */
export const suggestionFields = z.object({
	title: z.string(),
	description: z.string(),
	address: z.string(),
	locality: z.string(),
	// Fecha en que la añadimos; ordena el listado.
	pubDate: z.coerce.date().optional(),
	categoryArray: z.array(z.string()).default([]),
	recommendedBy: z.string().optional(),
	// Las prioritarias salen primero.
	priority: z.boolean().default(false),
	restaurantLinks: restaurantLinksSchema.optional(),
	coordinates: coordinatesSchema.optional(),
});
