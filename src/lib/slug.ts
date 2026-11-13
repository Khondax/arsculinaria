/** Convierte una categoría en un segmento de URL: `Sidrería Asturiana` → `sidreria-asturiana`. */
export function categorySlug(value: string): string {
	return value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
