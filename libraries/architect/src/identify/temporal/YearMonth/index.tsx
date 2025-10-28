//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import type { TemporalBaseProps } from "../../../../types/temporal/index.ts"

import parseTemporalString from "../../../helpers/arborists/parseTemporalString/index.ts"
import formatDate from "../../../helpers/formatters/formatDate/index.ts"

export type Props =
	& Omit<TemporalBaseProps, "showZone" | "timezone" | "format">
	& {
		// Display format
		format?: "numeric" | "short" | "medium" | "long" | "full"
		children?:
			| string
			| ((
				formatted: { display: string; datetime: string },
			) => JSX.Element)
	}

export default function YearMonth({
	value,
	locale,
	calendar,
	format = "long",
	formatOptions,
	className,
	children: childrenProp,
	...props
}: Props): JSX.Element {
	// Handle children from JSX - could be array, string, or function
	const children = Array.isArray(childrenProp) && childrenProp.length === 0
		? undefined
		: childrenProp
	// Parse the value
	const parsed = typeof value === "string" ? parseTemporalString(value) : {
		year: value.getFullYear(),
		month: value.getMonth() + 1,
		type: "yearmonth" as const,
		original: value.toISOString().substring(0, 7),
	}

	// Add calendar to parsed result
	if (calendar) parsed.calendar = calendar

	// Build datetime attribute (YYYY-MM format)
	const datetime = `${String(parsed.year).padStart(4, "0")}-${
		String(parsed.month).padStart(2, "0")
	}`

	// Format the display
	const date = new Date(parsed.year!, parsed.month! - 1, 1)

	let display: string
	if (format === "numeric") {
		// Numeric format: MM/YYYY or similar based on locale
		display = formatDate(date, locale, {
			year: "numeric",
			month: "2-digit",
			calendar,
		})
	} else if (format === "short") {
		// Short format: 12/25 for en-US
		const formatted = formatDate(date, locale, {
			year: "2-digit",
			month: "2-digit",
			calendar,
		})
		// Extract just month/year without day
		display = formatted.replace(/^\d{1,2}[\/\-\.]/, "")
	} else {
		// Use Intl.DateTimeFormat with specific options
		const options = formatOptions || {
			year: "numeric" as const,
			month: (format === "medium"
				? "short"
				: (format === "long" || format === "full" ? "long" : "short")) as
					| "short"
					| "long",
			calendar,
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
