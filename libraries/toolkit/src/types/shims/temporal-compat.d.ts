// Minimal Temporal type shims to satisfy TypeScript in environments
// where lib definitions are unavailable. These are intentionally
// loose (any-indexed) and only for type-checking. No runtime is provided.

// Augment global scope carefully to avoid duplicate identifier errors when
// lib definitions are present. Use unknown instead of any to satisfy lint rules.
declare global {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Temporal: unknown
	// Minimal type namespace; keep identifiers local (not self-referencing) to avoid
	// resolution errors when the namespace value is unknown.
	namespace TemporalShimTypes {
		type DateTimeUnit = string
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface AnyObject {
			[key: string]: unknown
		}
		class PlainDate implements AnyObject {}
		class PlainDateTime implements AnyObject {
			static compare(a: unknown, b: unknown): number
		}
		class PlainTime implements AnyObject {
			static compare(a: unknown, b: unknown): number
		}
		class PlainYearMonth implements AnyObject {}
		class PlainMonthDay implements AnyObject {}
		class ZonedDateTime implements AnyObject {}
		class Instant implements AnyObject {
			static compare(a: unknown, b: unknown): number
		}
		class Duration implements AnyObject {}
	}
}

export {}
