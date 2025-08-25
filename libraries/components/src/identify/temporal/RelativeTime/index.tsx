/**
 * RelativeTime component
 *
 * Displays time relative to another point in time using
 * Intl.RelativeTimeFormat for proper localization.
 * Auto-updates the display unit based on the time difference.
 *
 * Example usage:
 *
 * // Relative to now
 * <RelativeTime value="2024-01-10T14:30:00Z" />
 * // → 3 days ago
 *
 * // Relative to specific date
 * <RelativeTime
 *   value="2024-01-20"
 *   relativeTo="2024-01-15"
 * />
 * // → in 5 days
 *
 * // With numeric style
 * <RelativeTime value="2024-01-10T14:30:00Z" numeric="always" />
 * // → 3 days ago
 *
 * // With auto style (today, yesterday, tomorrow)
 * <RelativeTime value={yesterday} numeric="auto" />
 * // → yesterday
 *
 * // Force specific unit
 * <RelativeTime value="2024-01-10T14:30:00Z" unit="hour" />
 * // → 72 hours ago
 *
 * // With locale
 * <RelativeTime value="2024-01-10" locale="es-ES" />
 * // → hace 3 días
 */

import type { TemporalBaseProps } from "../../../../../types/temporal/index.ts"

import formatRelativeTime from "../../../../utilities/formatters/formatRelativeTime/index.ts"
import parseTemporalString from "../../../../utilities/parsers/parseTemporalString/index.ts"

export type Props =
	& Omit<
		TemporalBaseProps,
		"format" | "formatOptions" | "showZone" | "timezone" | "calendar"
	>
	& {
		// Numeric display style
		numeric?: "always" | "auto"

		// Force specific unit
		unit?: Intl.RelativeTimeFormatUnit

		// Custom now function (for testing)
		now?: () => Date
	}

// Calculate the best unit and value for relative time
function calculateRelativeTime(
	date: Date,
	relativeTo: Date,
): { value: number; unit: Intl.RelativeTimeFormatUnit } {
	const diffMs = date.getTime() - relativeTo.getTime()
	const diffSecs = Math.round(diffMs / 1000)
	const diffMins = Math.round(diffSecs / 60)
	const diffHours = Math.round(diffMins / 60)
	const diffDays = Math.round(diffHours / 24)
	const diffWeeks = Math.round(diffDays / 7)
	const diffMonths = Math.round(diffDays / 30.44)
	const diffYears = Math.round(diffDays / 365.25)

	// Choose the most appropriate unit
	if (Math.abs(diffYears) >= 1) {
		return { value: diffYears, unit: "year" }
	} else if (Math.abs(diffMonths) >= 1) {
		return { value: diffMonths, unit: "month" }
	} else if (Math.abs(diffWeeks) >= 1) {
		return { value: diffWeeks, unit: "week" }
	} else if (Math.abs(diffDays) >= 1) {
		return { value: diffDays, unit: "day" }
	} else if (Math.abs(diffHours) >= 1) {
		return { value: diffHours, unit: "hour" }
	} else if (Math.abs(diffMins) >= 1) {
		return { value: diffMins, unit: "minute" }
	} else {
		return { value: diffSecs, unit: "second" }
	}
}

// Calculate forced unit value
function calculateForcedUnit(
	date: Date,
	relativeTo: Date,
	unit: Intl.RelativeTimeFormatUnit,
): number {
	const diffMs = date.getTime() - relativeTo.getTime()

	switch (unit) {
		case "year":
			return Math.round(diffMs / (365.25 * 24 * 60 * 60 * 1000))
		case "quarter":
			return Math.round(diffMs / (3 * 30.44 * 24 * 60 * 60 * 1000))
		case "month":
			return Math.round(diffMs / (30.44 * 24 * 60 * 60 * 1000))
		case "week":
			return Math.round(diffMs / (7 * 24 * 60 * 60 * 1000))
		case "day":
			return Math.round(diffMs / (24 * 60 * 60 * 1000))
		case "hour":
			return Math.round(diffMs / (60 * 60 * 1000))
		case "minute":
			return Math.round(diffMs / (60 * 1000))
		case "second":
			return Math.round(diffMs / 1000)
		default:
			return 0
	}
}

export default function RelativeTime({
	value,
	relativeTo,
	locale,
	numeric = "always",
	unit,
	now = () => new Date(),
	className,
	children: childrenProp,
	...props
}: Props): JSX.Element {
	// Handle children from JSX - could be array, string, or function
	const children = Array.isArray(childrenProp) && childrenProp.length === 0
		? undefined
		: childrenProp
	// Parse the value
	const targetDate = typeof value === "string"
		? (() => {
			const parsed = parseTemporalString(value)
			return new Date(
				parsed.year!,
				parsed.month! - 1,
				parsed.day || 1,
				parsed.hour || 0,
				parsed.minute || 0,
				parsed.second || 0,
			)
		})()
		: value

	// Parse relative date
	const relativeDate = !relativeTo
		? now()
		: typeof relativeTo === "string"
		? new Date(relativeTo)
		: relativeTo

	// Calculate relative time
	let relativeValue: number
	let relativeUnit: Intl.RelativeTimeFormatUnit

	if (unit) {
		// Forced unit
		relativeValue = calculateForcedUnit(targetDate, relativeDate, unit)
		relativeUnit = unit
	} else {
		// Auto unit
		const calculated = calculateRelativeTime(targetDate, relativeDate)
		relativeValue = calculated.value
		relativeUnit = calculated.unit
	}

	// Format the display
	const rtf = new Intl.RelativeTimeFormat(locale || "en-US", {
		numeric,
		style: "long",
	})

	const display = rtf.format(relativeValue, relativeUnit)

	// Build datetime attribute
	const datetime = targetDate.toISOString()

	// Handle render prop
	if (typeof children === "function") {
		return (
			<time
				dateTime={datetime}
				className={className}
				data-relative-value={relativeValue}
				data-relative-unit={relativeUnit}
				{...props}
			>
				{children({
					display,
					datetime,
					value: relativeValue,
					unit: relativeUnit,
				})}
			</time>
		)
	}

	return (
		<time
			dateTime={datetime}
			className={className}
			data-relative-value={relativeValue}
			data-relative-unit={relativeUnit}
			{...props}
		>
			{children || display}
		</time>
	)
}
