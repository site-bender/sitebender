/**
 * YearMonth component
 *
 * Represents a year-month combination without a specific day.
 * Useful for credit card expiration dates, monthly reports, etc.
 * Maps to Temporal.PlainYearMonth.
 *
 * Example usage:
 *
 * // Simple year-month
 * <YearMonth value="2024-01" />
 * // → January 2024
 *
 * // With locale
 * <YearMonth value="2024-01" locale="fr-FR" />
 * // → janvier 2024
 *
 * // Different formats
 * <YearMonth value="2024-01" format="numeric" />
 * // → 01/2024
 *
 * // With calendar system
 * <YearMonth value="2024-01" calendar="hebrew" locale="he-IL" />
 * // → טבת תשפ״ד
 *
 * // Credit card expiration
 * <YearMonth value="2025-12" format="short">
 *   {({ display }) => <>Expires: {display}</>}
 * </YearMonth>
 * // → Expires: 12/25
 */

import type { TemporalBaseProps } from "../utils/types.ts"
import { parseTemporalString, buildDateTimeAttribute } from "../utils/parsers.ts"
import { formatDate } from "../utils/formatters.ts"

export interface YearMonthProps extends Omit<TemporalBaseProps, "showZone" | "timezone"> {
	// Display format
	format?: "numeric" | "short" | "medium" | "long" | "full"
}

export default function YearMonth({
	value,
	locale,
	calendar,
	format = "long",
	formatOptions,
	className,
	children,
	...props
}: YearMonthProps): JSX.Element {
	// Parse the value
	const parsed = typeof value === "string"
		? parseTemporalString(value)
		: {
			year: value.getFullYear(),
			month: value.getMonth() + 1,
			type: "yearmonth" as const,
			original: value.toISOString().substring(0, 7)
		}
	
	// Add calendar to parsed result
	if (calendar) parsed.calendar = calendar
	
	// Build datetime attribute (YYYY-MM format)
	const datetime = `${String(parsed.year).padStart(4, "0")}-${String(parsed.month).padStart(2, "0")}`
	
	// Format the display
	const date = new Date(parsed.year!, parsed.month! - 1, 1)
	
	let display: string
	if (format === "numeric") {
		// Numeric format: MM/YYYY or similar based on locale
		display = formatDate(date, locale, {
			year: "numeric",
			month: "2-digit",
			calendar
		})
	} else if (format === "short") {
		// Short format: 12/25 for en-US
		const formatted = formatDate(date, locale, {
			year: "2-digit",
			month: "2-digit",
			calendar
		})
		// Extract just month/year without day
		display = formatted.replace(/^\d{1,2}[\/\-\.]/, "")
	} else {
		// Use Intl.DateTimeFormat with specific options
		const options = formatOptions || {
			year: "numeric",
			month: format === "medium" ? "short" : format as any,
			calendar
		}
		
		display = formatDate(date, locale, options)
	}
	
	// Handle render prop
	if (typeof children === "function") {
		return (
			<time
				dateTime={datetime}
				className={className}
				{...props}
			>
				{children({ display, datetime })}
			</time>
		)
	}
	
	return (
		<time
			dateTime={datetime}
			className={className}
			{...props}
		>
			{children || display}
		</time>
	)
}