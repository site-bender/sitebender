//++ Type guard that checks if a value is a Date object (including Invalid Date instances)
export default function isDate(value: unknown): value is Date {
	return value instanceof Date
}

//?? [EXAMPLE] isDate(new Date()) // true
//?? [EXAMPLE] isDate(new Date("2024-01-01")) // true
//?? [EXAMPLE] isDate(new Date("invalid")) // true (Invalid Date)
//?? [EXAMPLE] isDate(Date.now()) // false (number)
//?? [EXAMPLE] isDate("2024-01-01") // false (string)
/*??
 * [EXAMPLE]
 * function formatDate(value: unknown): string {
 *   if (isDate(value)) {
 *     return value.toISOString()  // TypeScript knows it's Date
 *   }
 *   return "Not a date"
 * }
 *
 * [GOTCHA] Invalid Date objects still return true (they're Date instances)
 * [PRO] TypeScript type guard enables safe date operations
 */
