/**
 * Format quarter based on locale
 */
export default function formatQuarter(
	quarter: number,
	_locale?: string,
): string {
	// Most locales use Q1, Q2, etc.
	// Some might have specific formatting
	// Placeholder: locale-aware quarter names could be added later
	// const formatter = new Intl.DateTimeFormat(locale, { month: "long" })
	// const firstMonth = (quarter - 1) * 3 + 1
	// const date = new Date(2024, firstMonth - 1, 1)

	// For now, use Q format universally
	// Could be extended for locale-specific formats
	return `Q${quarter}`
}
