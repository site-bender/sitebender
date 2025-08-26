declare global {
	namespace JSX {
		type Element = unknown
		interface ElementChildrenAttribute { children: Record<PropertyKey, never> }
		// Allow any intrinsic element for demo simplicity
		interface IntrinsicElements {
			[elemName: string]: unknown
		}
	}
}
export {}
