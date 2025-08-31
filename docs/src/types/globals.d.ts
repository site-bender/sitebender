declare global {
	namespace JSX {
		// Only provide the children marker here to avoid conflicts with the components library globals
		interface ElementChildrenAttribute {
			children: Record<PropertyKey, never>
		}
	}
}
export {}
