import type { DateInput } from "../../../types/temporal/index.ts"

import toPlainDate from "../../conversion/castValue/toPlainDate/index.ts"

function todayIsoLocal(): string {
	const d = new Date()
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	
	return `${y}-${m}-${day}`
}

function toIsoDateString(pd: unknown): string | null {
	if (
		pd && typeof (pd as { toString: () => string }).toString === "function"
	) {
		const iso = (pd as { toString: () => string }).toString()
		
		return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : null
	}
	
	return null
}

//++ Checks if a date is in the future relative to today (strictly after today)
export default function isFutureDate(
	value: DateInput | null | undefined,
): boolean {
	const date = toPlainDate(value)

	if (!date) {
		return false
	}

	const iso = toIsoDateString(date)
	
	if (!iso) return false
	
	return iso > todayIsoLocal()
}

//?? [EXAMPLE] isFutureDate("2025-01-01") // true (if today is before 2025-01-01)
//?? [EXAMPLE] isFutureDate(new Date()) // false (today is not future)
//?? [EXAMPLE] isFutureDate(null) // false
//?? [EXAMPLE] isFutureDate("invalid") // false
/*??
 * [EXAMPLE]
 * const tomorrow = Temporal.Now.plainDateISO().add({ days: 1 })
 * isFutureDate(tomorrow)  // true
 * isFutureDate(Temporal.Now.plainDateISO())  // false (today)
 *
 * [GOTCHA] Today's date returns false (not considered future)
 * [PRO] Accepts various date formats via DateInput type
 */
