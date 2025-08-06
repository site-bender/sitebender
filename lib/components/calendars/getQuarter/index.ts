/**
 * Get quarter number (1-4) for a date
 */
export default function getQuarter(date: Date): number {
	return Math.floor(date.getMonth() / 3) + 1
}