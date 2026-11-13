import { getCollection, type CollectionEntry } from 'astro:content';
import { ratingAverage } from './rating';
import { categorySlug } from './slug';

export type Review = CollectionEntry<'reviews'>;
export type Recipe = CollectionEntry<'recipes'>;
export type Suggestion = CollectionEntry<'suggestions'>;

const byNewest = (a: { data: { pubDate: Date } }, b: { data: { pubDate: Date } }) =>
	b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

/** Todas las reseñas, de la más reciente a la más antigua. */
export async function getReviews(): Promise<Review[]> {
	return (await getCollection('reviews')).sort(byNewest);
}

/** Todas las recetas, de la más reciente a la más antigua. */
export async function getRecipes(): Promise<Recipe[]> {
	return (await getCollection('recipes')).sort(byNewest);
}

/** Sugerencias pendientes: primero las prioritarias y, dentro de cada grupo, las añadidas más recientemente. */
export async function getSuggestions(): Promise<Suggestion[]> {
	return (await getCollection('suggestions')).sort(
		(a, b) =>
			Number(b.data.priority) - Number(a.data.priority) ||
			(b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0),
	);
}

/** Nota media de una reseña, si está puntuada. */
export function reviewScore(review: Review): number | undefined {
	return review.data.rating && ratingAverage(review.data.rating);
}

/** Props de `PostCard` para una reseña. */
export function reviewCardProps(review: Review) {
	const { title, description, pubDate, image, averagePrice, categoryArray, locality } = review.data;
	return {
		href: `/reviews/${review.id}/`,
		title,
		description,
		date: pubDate,
		image,
		averagePrice,
		categories: categoryArray,
		locality,
		score: reviewScore(review),
	};
}

/** Reseñas que comparten categoría con `review`; si no hay suficientes, completa con las más recientes. */
export function getRelatedReviews(review: Review, all: Review[], limit = 3): Review[] {
	const others = all.filter((r) => r.id !== review.id);
	const categories = new Set(review.data.categoryArray);
	const related = others.filter((r) => r.data.categoryArray.some((c) => categories.has(c)));
	const rest = others.filter((r) => !related.includes(r));
	return [...related, ...rest].slice(0, limit);
}

/** Lista ordenada de categorías únicas. */
export function getCategories(reviews: Review[]): string[] {
	const set = new Set(reviews.flatMap((r) => r.data.categoryArray.map(normalizeCategory)));
	return [...set].sort((a, b) => a.localeCompare(b, 'es'));
}

export interface CategoryGroup {
	slug: string;
	name: string;
	reviews: Review[];
}

/** Agrupa las reseñas por categoría (por su slug), en orden alfabético. Conserva el orden de `reviews`. */
export function groupByCategory(reviews: Review[]): CategoryGroup[] {
	const groups = new Map<string, CategoryGroup>();
	for (const review of reviews) {
		for (const category of review.data.categoryArray) {
			const slug = categorySlug(category);
			if (!slug) continue;
			const group = groups.get(slug) ?? { slug, name: formatCategory(category), reviews: [] };
			if (!group.reviews.includes(review)) group.reviews.push(review);
			groups.set(slug, group);
		}
	}
	return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

export function normalizeCategory(category: string): string {
	return category.trim().toLowerCase();
}

export function formatCategory(category: string): string {
	const c = normalizeCategory(category);
	return c.charAt(0).toUpperCase() + c.slice(1);
}

const euro = new Intl.NumberFormat('es-ES', {
	style: 'currency',
	currency: 'EUR',
	maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
	return euro.format(price);
}

/** Rango de precio tipo guía: € (< 25), €€ (< 50), €€€ (< 90), €€€€. */
export function priceLevel(price: number): 1 | 2 | 3 | 4 {
	if (price < 25) return 1;
	if (price < 50) return 2;
	if (price < 90) return 3;
	return 4;
}
