/**
 * MonthDay component
 *
 * Represents a month-day combination without a specific year.
 * Useful for recurring dates like birthdays, anniversaries, holidays.
 * Maps to Temporal.PlainMonthDay.
 *
 * Example usage:
 *
 * // Birthday (no year)
 * <MonthDay value="--07-15" />
 * // → July 15
 *
 * // With locale
 * <MonthDay value="--12-25" locale="es-ES" />
 * // → 25 de diciembre
 *
 * // Short format
 * <MonthDay value="--01-01" format="short" />
 * // → Jan 1
 *
 * // Numeric format
 * <MonthDay value="--07-04" format="numeric" />
 * // → 7/4
 *
 * // With custom content
 * <MonthDay value="--02-14">
 *   {({ display }) => <>Valentine's Day is {display}</>}
 * </MonthDay>
 */

import type { TemporalBaseProps } from "../../../../types/temporal/index.ts"

import formatDate from "../../../helpers/formatters/formatDate/index.ts"

export type Props =
	& Omit<TemporalBaseProps, "showZone" | "timezone" | "calendar" | "format">
	& {
		// Display format
		format?: "numeric" | "short" | "medium" | "long" | "full"
		children?:
			| string
			| ((formatted: { display: string; datetime: string }) => JSX.Element)
	}

export default function MonthDay({
	value,
	locale,
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
	let month: number
	let day: number

	if (typeof value === "string") {
		// Handle --MM-DD format or MM-DD
		const match = value.match(/^(?:--)?(\d{2})-(\d{2})$/)
		if (!match) {
			throw new Error(
				`Invalid MonthDay format: ${value}. Use --MM-DD or MM-DD format.`,
			)
		}
		month = parseInt(match[1])
		day = parseInt(match[2])
	} else {
		month = value.getMonth() + 1
		day = value.getDate()
	}

	// Build datetime attribute (--MM-DD format per ISO 8601)
	const datetime = `--${String(month).padStart(2, "0")}-${
		String(day).padStart(2, "0")
	}`

	// Format the display using a leap year to ensure Feb 29 works
	const date = new Date(2024, month - 1, day)

	let display: string
	if (format === "numeric") {
		// Numeric format: M/D or D/M based on locale
		display = formatDate(date, locale, {
			month: "numeric",
			day: "numeric",
		})
	} else {
		// Use Intl.DateTimeFormat with specific options (numeric handled above)
		const monthStyle: "short" | "long" =
			format === "short" || format === "medium" ? "short" : "long"
		const options = formatOptions || {
			month: monthStyle,
			day: "numeric",
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
