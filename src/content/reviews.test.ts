import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import matter from 'gray-matter';
import { reviewFields } from './review-schema';

/**
 * Valida el frontmatter de cada reseña contra el esquema compartido
 * (`review-schema.ts`) sin necesitar `astro:content`.
 */

const reviewsDir = path.resolve(__dirname, 'reviews');
const reviewFiles = fs.readdirSync(reviewsDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
const assetsDir = path.resolve(__dirname, '..', 'assets');

describe('Colección de reseñas', () => {
	it('hay archivos de reseña', () => {
		expect(reviewFiles.length).toBeGreaterThan(0);
	});

	for (const file of reviewFiles) {
		describe(file, () => {
			const { data } = matter(fs.readFileSync(path.join(reviewsDir, file), 'utf-8'));

			it('cumple el esquema', () => {
				const result = reviewFields.safeParse(data);
				if (!result.success) {
					const errors = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
					expect.fail(`El frontmatter no cumple el esquema:\n${errors.join('\n')}`);
				}
			});

			it('la imagen existe si se indica', () => {
				if (typeof data.image !== 'string') return;
				const image = path.resolve(reviewsDir, data.image);
				expect(image.startsWith(assetsDir), `${data.image} debe estar en src/assets/`).toBe(true);
				expect(fs.existsSync(image), `${data.image} no existe`).toBe(true);
			});
		});
	}
});
