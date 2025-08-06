/**
 * Format quarter based on locale
 */
export default function formatQuarter(quarter: number, locale?: string): string {
	// Most locales use Q1, Q2, etc.
	// Some might have specific formatting
	const formatter = new Intl.DateTimeFormat(locale, {
		month: "long"
	})
	
	// Get first month of quarter
	const firstMonth = (quarter - 1) * 3 + 1
	const date = new Date(2024, firstMonth - 1, 1)
	
	// For now, use Q format universally
	// Could be extended for locale-specific formats
	return `Q${quarter}`
}