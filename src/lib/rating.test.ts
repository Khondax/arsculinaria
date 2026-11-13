import { describe, expect, it } from 'vitest';
import { formatScore, ratingAverage, ratingVerdict } from './rating';
import { categorySlug } from './slug';

describe('ratingAverage', () => {
	it('promedia los cuatro aspectos con un decimal', () => {
		expect(ratingAverage({ food: 9, service: 9, ambiance: 8, value: 9 })).toBe(8.8);
		expect(ratingAverage({ food: 10, service: 10, ambiance: 10, value: 10 })).toBe(10);
	});
});

describe('formatScore', () => {
	it('usa coma decimal y siempre un decimal', () => {
		expect(formatScore(8.75)).toBe('8,8');
		expect(formatScore(9)).toBe('9,0');
	});
});

describe('ratingVerdict', () => {
	it('asigna el veredicto del tramo inferior', () => {
		expect(ratingVerdict(10)).toBe('Magistral');
		expect(ratingVerdict(9.9)).toBe('Referente');
		expect(ratingVerdict(7)).toBe('Muy recomendable');
		expect(ratingVerdict(1)).toBe('Malo');
		expect(ratingVerdict(0.5)).toBe('Inaceptable');
	});
});

describe('categorySlug', () => {
	it('quita tildes, mayúsculas y símbolos', () => {
		expect(categorySlug('Sidrería')).toBe('sidreria');
		expect(categorySlug(' Fusión asiática ')).toBe('fusion-asiatica');
		expect(categorySlug('¿Raro?')).toBe('raro');
	});
});
