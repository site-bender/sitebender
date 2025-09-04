import type createElementType from "../src/helpers/createElement/index.ts"
import type FragmentType from "../src/helpers/Fragment/index.ts"

declare global {
	const createElement: typeof createElementType
	const Fragment: typeof FragmentType

	namespace JSX {
		// Make JSX.Element permissive so components that sometimes return non-VDOM data still type-check
		type Element = unknown

		interface IntrinsicElements {
			[elemName: string]: any
		}

		// Minimal attribute interfaces used across components
		interface HTMLAttributes<T> {
			[key: string]: any
		}
		interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {}
		interface FieldSetHTMLAttributes<T> extends HTMLAttributes<T> {}
		interface FormHTMLAttributes<T> extends HTMLAttributes<T> {}
		interface InputHTMLAttributes<T> extends HTMLAttributes<T> {}
		interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {}
		interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {}
		interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {}
		interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {}
	}

	// Optional V8 exposed fields used in tests/benchmarks
	interface Performance {
		memory?: { usedJSHeapSize?: number }
	}
	// Optional GC hook in some environments
	var gc: (() => void) | undefined
}

export {}
