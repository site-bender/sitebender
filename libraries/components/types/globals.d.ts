import type createElementType from "../../utilities/createElement/index.ts"
import type FragmentType from "../../utilities/Fragment/index.ts"

declare global {
	const createElement: typeof createElementType
	const Fragment: typeof FragmentType

	namespace JSX {
		interface Element {
			type: string
			props: Record<string, unknown>
			children?: unknown
		}

		interface IntrinsicElements {
			[elemName: string]: Record<string, unknown>
		}
	}

	namespace Temporal {
		class PlainDate {
			static from(item: unknown): PlainDate
		}
		class PlainTime {
			static from(item: unknown): PlainTime
		}
		class PlainDateTime {
			static from(item: unknown): PlainDateTime
		}
		class ZonedDateTime {
			static from(item: unknown): ZonedDateTime
		}
	}
}

export {}
