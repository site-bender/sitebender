/**
 * Calculate Julian Day Number
 */
export default function getJulianDayNumber(date: Date): number {
	const a = Math.floor((14 - (date.getMonth() + 1)) / 12)
	const y = date.getFullYear() + 4800 - a
	const m = (date.getMonth() + 1) + 12 * a - 3
	
	return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
		Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}