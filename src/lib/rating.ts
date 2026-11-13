/** Puntuación de una reseña: cada aspecto va de 1 a 10. */
export interface Rating {
	food: number;
	service: number;
	ambiance: number;
	value: number;
}

export const RATING_ASPECTS: { key: keyof Rating; label: string }[] = [
	{ key: 'food', label: 'Comida' },
	{ key: 'service', label: 'Servicio' },
	{ key: 'ambiance', label: 'Ambiente' },
	{ key: 'value', label: 'Calidad-precio' },
];

/** Media de los cuatro aspectos, redondeada a un decimal. */
export function ratingAverage(rating: Rating): number {
	const sum = rating.food + rating.service + rating.ambiance + rating.value;
	return Math.round((sum / 4) * 10) / 10;
}

/** Nota con un decimal y coma decimal: `8,5`. */
export function formatScore(score: number): string {
	return score.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

const VERDICTS: [min: number, label: string][] = [
	[10, 'Magistral'],
	[9, 'Referente'],
	[8, 'Excelente'],
	[7, 'Muy recomendable'],
	[6, 'Recomendable'],
	[5, 'Aceptable'],
	[4, 'Mejorable'],
	[3, 'Flojo'],
	[2, 'Fiasco'],
	[1, 'Malo'],
];

/** Veredicto en una palabra para una nota media de 1 a 10. */
export function ratingVerdict(average: number): string {
	return VERDICTS.find(([min]) => average >= min)?.[1] ?? 'Inaceptable';
}
