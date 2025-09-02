import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@adaptiveTypes/index.ts"

/**
 * Generic element constructor attributes type
 * Combines HTML-specific attributes with reactive system attributes
 */
export type ElementAttributes<T> = T & {
	/** ARIA attributes */
	aria?: Record<string, unknown>

	/** Reactive calculation configuration */
	calculation?: Operand

	/** Data attributes (becomes data-* on the element) */
	dataset?: Record<string, unknown>

	/** Conditional display configuration */
	display?: ComparatorConfig | LogicalConfig

	/** Value formatting configuration */
	format?: OperatorConfig

	/** JavaScript files to include */
	scripts?: Array<string>

	/** CSS files to include */
	stylesheets?: Array<string>

	/** Form validation configuration */
	validation?: ComparatorConfig | LogicalConfig
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
export type ChildFilter = (child: ElementConfig) => boolean

/**
 * Element configuration object structure (OUTPUT of constructors)
 */
export type ElementConfig<T = Record<string, unknown>> = {
	readonly tag: string
	readonly attributes: T
	readonly children: readonly unknown[]
	readonly calculation?: Operand
	readonly dataset?: Record<string, Value>
	readonly display?: ComparatorConfig | LogicalConfig
	readonly format?: OperatorConfig
	readonly scripts?: readonly string[]
	readonly stylesheets?: readonly string[]
	readonly validation?: ComparatorConfig | LogicalConfig
}
