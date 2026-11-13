import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { reviewFields } from './content/review-schema';
import { suggestionFields } from './content/suggestion-schema';

// `image` es una ruta relativa a una imagen de `src/assets/` para que Astro la optimice.

const reviews = defineCollection({
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => reviewFields.extend({ image: image().optional() }),
});

const suggestions = defineCollection({
	loader: glob({ base: './src/content/suggestions', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => suggestionFields.extend({ image: image().optional() }),
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

export const collections = { reviews, suggestions, recipes };
