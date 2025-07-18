declare global {
	namespace JSX {
		interface Element {
			type: string
			props: any
			children?: any
		}

		interface IntrinsicElements {
			[elemName: string]: any
		}
	}
}

export {}
