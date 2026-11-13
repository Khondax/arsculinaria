// Datos globales del sitio. Se pueden importar desde cualquier componente o página.

export const SITE_TITLE = 'Mesa para MiLu';
export const SITE_DESCRIPTION =
	'Reseñas honestas de restaurantes en Gran Canaria y allá donde viajemos, escritas por Miguel y Lucía.';
export const SITE_LOCALE = 'es-ES';

export const NAV_LINKS = [
	{ href: '/reviews', label: 'Reseñas' },
	{ href: '/buscador', label: 'Buscador' },
	{ href: '/recipes', label: 'Recetas' },
	{ href: '/about', label: 'Sobre nosotros' },
] as const;

export type SocialNetwork = 'instagram' | 'x' | 'github';

export const SOCIAL_LINKS: { network: SocialNetwork; href: string; label: string }[] = [
	{ network: 'instagram', href: 'https://www.instagram.com/miguelkh94/', label: 'Instagram' },
	{ network: 'x', href: 'https://x.com/luciaa_bp', label: 'X' },
	{ network: 'github', href: 'https://github.com/Khondax', label: 'GitHub' },
];
