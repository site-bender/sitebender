//++ Type guard for legacy JavaScript Date objects - for Temporal types use isPlainDate, isPlainDateTime, or isZonedDateTime
export default function isDate(value: unknown): value is Date {
	return value instanceof Date
}

//?? [EXAMPLE] isDate(new Date()) // true
//?? [EXAMPLE] isDate(new Date("2024-01-01")) // true
//?? [EXAMPLE] isDate(new Date("invalid")) // true (Invalid Date)
//?? [EXAMPLE] isDate(Date.now()) // false (number)
//?? [EXAMPLE] isDate("2024-01-01") // false (string)
//?? [EXAMPLE] isDate(Temporal.PlainDate.from("2024-01-01")) // false (Temporal)
/*??
 | [EXAMPLE]
 | function formatDate(value: unknown): string {
 |   if (isDate(value)) {
 |     return value.toISOString()  // TypeScript knows it's Date
 |   }
 |   return "Not a date"
 | }
 |
 | [GOTCHA] Invalid Date objects still return true (they're Date instances)
 | [GOTCHA] Returns false for Temporal types - use isPlainDate/isPlainDateTime/isZonedDateTime instead
 | [PRO] TypeScript type guard for legacy Date compatibility
 |
*/
