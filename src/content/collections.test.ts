import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import type { z } from 'astro/zod';
import { reviewFields } from './review-schema';
import { suggestionFields } from './suggestion-schema';

/**
 * Valida el frontmatter de cada reseña y sugerencia contra su esquema compartido
 * (`review-schema.ts`, `suggestion-schema.ts`) sin necesitar `astro:content`.
 */

const assetsDir = path.resolve(__dirname, '..', 'assets');

const collections: { name: string; dir: string; schema: z.ZodTypeAny }[] = [
	{ name: 'reseñas', dir: 'reviews', schema: reviewFields },
	{ name: 'sugerencias', dir: 'suggestions', schema: suggestionFields },
];

for (const { name, dir, schema } of collections) {
	const collectionDir = path.resolve(__dirname, dir);
	const files = fs.readdirSync(collectionDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

	describe(`Colección de ${name}`, () => {
		it('hay archivos', () => {
			expect(files.length).toBeGreaterThan(0);
		});

		for (const file of files) {
			describe(file, () => {
				const { data } = matter(fs.readFileSync(path.join(collectionDir, file), 'utf-8'));

				it('cumple el esquema', () => {
					const result = schema.safeParse(data);
					if (!result.success) {
						const errors = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
						expect.fail(`El frontmatter no cumple el esquema:\n${errors.join('\n')}`);
					}
				});

				it('la imagen existe si se indica', () => {
					if (typeof data.image !== 'string') return;
					const image = path.resolve(collectionDir, data.image);
					expect(image.startsWith(assetsDir), `${data.image} debe estar en src/assets/`).toBe(true);
					expect(fs.existsSync(image), `${data.image} no existe`).toBe(true);
				});
			});
		}
	});
}
