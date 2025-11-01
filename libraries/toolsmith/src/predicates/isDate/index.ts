/*++
 + Type guard for legacy JavaScript Date objects
 + For Temporal types use isPlainDate, isPlainDateTime, or isZonedDateTime
 + [EXCEPTION] unknown is permitted in predicates
 */
export default function isDate(value: unknown): value is Date {
	//++ [EXCEPTION] instanceof permitted in Toolsmith for performance - provides type predicate wrapper
	return value instanceof Date
}
