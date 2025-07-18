declare global {
	namespace JSX {
		interface Element {
			type: string
			props: any
			children?: any
		}
	}
}

export {}

/**
 * Generic element constructor attributes type
 * Combines HTML-specific attributes with reactive system attributes
 */
export type ElementAttributes<T> = T & {
	/** ARIA attributes */
	aria?: Record<string, unknown>

	/** Reactive calculation configuration */
	calculation?: unknown

	/** Data attributes (becomes data-* on the element) */
	dataset?: Record<string, unknown>

	/** Conditional display configuration */
	display?: unknown

	/** Value formatting configuration */
	format?: unknown

	/** JavaScript files to include */
	scripts?: Array<string>

	/** CSS files to include */
	stylesheets?: Array<string>

	/** Form validation configuration */
	validation?: unknown
}

/**
 * Text node configuration
 */
export type TextNodeConfig = {
	tag: "TextNode"
	content: string
}

/**
 * Text node constructor function type
 */
export type TextNodeConstructor = (content: unknown) => TextNodeConfig

/**
 * Child filter function type used by element constructors
 * to validate and filter children elements
 */
export type ChildFilter = (child: unknown) => boolean

/**
 * Element configuration object structure (OUTPUT of constructors)
 */
export type ElementConfig<T = Record<string, unknown>> = {
	readonly tag: string
	readonly attributes: T
	readonly children: readonly unknown[]
	readonly calculation?: unknown
	readonly dataset?: unknown
	readonly display?: unknown
	readonly format?: unknown
	readonly scripts?: unknown
	readonly stylesheets?: unknown
	readonly validation?: unknown
}
