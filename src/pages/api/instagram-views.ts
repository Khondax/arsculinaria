/**
 * GET /api/instagram-views?post=<código>
 *
 * Visualizaciones de una publicación de nuestra cuenta de Instagram. `post` es el código que va
 * tras `/p/` en la URL de la publicación (el `instagramPostId` de la reseña).
 * Responde `{ configured, views, isTrending }`. Si falta el token o la API falla, responde
 * `configured: false` o `views: null` y la página no muestra nada.
 *
 * Variables de entorno (en Vercel; ver `.env.example`):
 *   INSTAGRAM_ACCESS_TOKEN        token de larga duración de la API de Instagram
 *   INSTAGRAM_TRENDING_THRESHOLD  visualizaciones a partir de las que es «Tendencia» (1000 por defecto)
 *
 * Se ejecuta bajo demanda (función de Vercel); el resto del sitio es estático.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const API = 'https://graph.instagram.com';
const CACHE_TTL = 60 * 60 * 1000;
const POST_CODE = /^[\w-]{5,40}$/;

// Cachés en memoria de la instancia: código → id de la publicación, y código → visualizaciones.
const mediaIds = new Map<string, string>();
const viewsCache = new Map<string, { views: number; at: number }>();

async function graph<T>(path: string, token: string): Promise<T> {
	const url = new URL(path, API);
	url.searchParams.set('access_token', token);
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Instagram respondió ${response.status} en ${url.pathname}`);
	return response.json() as Promise<T>;
}

/** La API de insights pide el id numérico; lo buscamos entre las publicaciones de la cuenta. */
async function findMediaId(code: string, token: string): Promise<string | undefined> {
	const cached = mediaIds.get(code);
	if (cached) return cached;

	type Page = { data: { id: string; shortcode: string }[]; paging?: { next?: string } };
	let next: string | undefined = '/me/media?fields=id,shortcode&limit=100';
	for (let page = 0; next && page < 10; page++) {
		const result: Page = await graph<Page>(next, token);
		for (const media of result.data) mediaIds.set(media.shortcode, media.id);
		if (mediaIds.has(code)) return mediaIds.get(code);
		next = result.paging?.next;
	}
	return undefined;
}

async function fetchViews(code: string, token: string): Promise<number | null> {
	const cached = viewsCache.get(code);
	if (cached && Date.now() - cached.at < CACHE_TTL) return cached.views;

	const id = await findMediaId(code, token);
	if (!id) return null;
	type Insights = { data: { name: string; values: { value: number }[] }[] };
	const insights = await graph<Insights>(`/${id}/insights?metric=views`, token);
	const views = insights.data.find((metric) => metric.name === 'views')?.values[0]?.value;
	if (typeof views !== 'number') return null;
	viewsCache.set(code, { views, at: Date.now() });
	return views;
}

const json = (body: unknown, status = 200, cache = true) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...(cache && { 'Cache-Control': 'public, max-age=3600' }),
		},
	});

export const GET: APIRoute = async ({ url }) => {
	const code = url.searchParams.get('post') ?? '';
	if (!POST_CODE.test(code)) return json({ error: 'Parámetro post no válido' }, 400, false);

	const token = import.meta.env.INSTAGRAM_ACCESS_TOKEN;
	if (!token) return json({ configured: false, views: null, isTrending: false });

	const threshold = Number(import.meta.env.INSTAGRAM_TRENDING_THRESHOLD) || 1000;
	try {
		const views = await fetchViews(code, token);
		return json({ configured: true, views, isTrending: views !== null && views >= threshold });
	} catch (error) {
		console.error('[instagram-views]', error);
		return json({ configured: true, views: null, isTrending: false }, 200, false);
	}
};
