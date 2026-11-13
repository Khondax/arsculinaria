import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { formatCategory, getReviews } from '../lib/content';

export async function GET(context: APIContext) {
	const reviews = await getReviews();

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ?? context.url.origin,
		customData: '<language>es-es</language>',
		items: reviews.map((review) => ({
			title: review.data.title,
			description: review.data.description,
			pubDate: review.data.pubDate,
			categories: review.data.categoryArray.map(formatCategory),
			link: `/reviews/${review.id}/`,
		})),
	});
}
