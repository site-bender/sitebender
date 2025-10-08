//++ Type guard for legacy JavaScript Date objects - for Temporal types use isPlainDate, isPlainDateTime, or isZonedDateTime
export default function isDate(value: unknown): value is Date {
	return value instanceof Date
}
