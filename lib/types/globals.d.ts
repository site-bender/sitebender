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
}

export {}
