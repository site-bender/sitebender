/**
 * Base type for all element configurations in the Sitebender library
 */
export type ElementTag =
	| "TextNode"
	| "Html"
	| "Head"
	| "Body"
	| "Div"
	| "P"
	| "Span"
// Add more as we migrate

/**
 * Minimal element configuration for utility functions
 */
export type ElementConfig = {
	readonly tag?: string
	readonly children?: readonly unknown[]
}

/**
 * Configuration object returned by TextNode constructor
 */
export type TextNodeConfig = {
	readonly tag: "TextNode"
	readonly content: string
}

/**
 * Type for the TextNode constructor function
 */
export type TextNodeConstructor = (content: unknown) => TextNodeConfig

/**
 * Global HTML attributes that can be applied to any element
 */
export type GlobalAttributes = {
	readonly id?: string
	readonly class?: string
	readonly title?: string
	readonly lang?: string
	readonly dir?: "ltr" | "rtl" | "auto"
	readonly hidden?: boolean | "" | "hidden" | "until-found"
	readonly tabIndex?: number
	readonly tabindex?: number // Allow both camelCase and lowercase
	readonly role?: string
	readonly style?: string
	// Add more global attributes as needed
}

/**
 * ARIA attributes for accessibility
 */
export type AriaAttributes = {
	readonly label?: string
	readonly hidden?: boolean
	readonly expanded?: boolean
	readonly selected?: boolean
	readonly describedby?: string
	readonly describedBy?: string // Allow both camelCase and lowercase
	// Add more ARIA attributes as needed
}

/**
 * Special properties that can be attached to elements
 */
export type SpecialProperties = {
	readonly calculation?: unknown | undefined
	readonly dataset?: Record<string, unknown> | undefined
	readonly display?: unknown | undefined
	readonly format?: unknown | undefined
	readonly scripts?: readonly string[] | undefined
	readonly stylesheets?: readonly string[] | undefined
}

/**
 * Base element configuration that all elements share
 */
export type BaseElementConfig<TTag extends ElementTag> = {
	readonly tag: TTag
	readonly attributes: GlobalAttributes
	readonly children: readonly unknown[]
} & SpecialProperties

/**
 * Configuration object returned by Div constructor
 */
export type DivConfig = BaseElementConfig<"Div">

/**
 * Input type for Div attributes (includes special properties)
 */
export type DivAttributes = GlobalAttributes & SpecialProperties & {
	readonly aria?: AriaAttributes
}

/**
 * Type for the Div constructor function
 */
export type DivConstructor = (
	attributes?: Record<string, unknown>,
) => (children: unknown) => DivConfig

/**
 * Configuration object returned by GlobalEmpty constructor
 */
export type GlobalEmptyConfig<TTag extends string = string> = {
	readonly tag: TTag
	readonly attributes: Record<string, unknown> & {
		readonly id?: string
		readonly class?: string
		readonly title?: string
		readonly lang?: string
		readonly dir?: string
		readonly hidden?: boolean
		readonly tabindex?: number
		readonly role?: string
		readonly href?: string
		readonly src?: string
		readonly [key: string]: unknown
	}
} & Partial<SpecialProperties>

/**
 * Input type for GlobalEmpty attributes
 */
export type GlobalEmptyAttributes<TTag extends string = string> =
	& GlobalAttributes
	& SpecialProperties
	& {
		readonly aria?: AriaAttributes
		readonly [key: `data-${string}`]: string | number | boolean | undefined
	}

/**
 * Type for the GlobalEmpty constructor function
 */
export type GlobalEmptyConstructor<TTag extends string = string> = (
	attributes?: GlobalEmptyAttributes<TTag>,
) => GlobalEmptyConfig<TTag>
