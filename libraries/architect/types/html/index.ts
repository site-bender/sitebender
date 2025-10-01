//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "../index.ts"

export type ElementTag =
	| "TextNode"
	| "Html"
	| "Head"
	| "Body"
	| "Div"
	| "P"
	| "Span"
// Add more as we migrate

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ElementConfig = {
	readonly tag?: string
	readonly children?: readonly unknown[]
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TextNodeConfig = {
	readonly tag: "TextNode"
	readonly content: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TextNodeConstructor = (content: Value) => TextNodeConfig

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type AriaAttributes = {
	readonly label?: string
	readonly hidden?: boolean
	readonly expanded?: boolean
	readonly selected?: boolean
	readonly describedby?: string
	readonly describedBy?: string // Allow both camelCase and lowercase
	// Add more ARIA attributes as needed
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type SpecialProperties = {
	readonly calculation?: Operand | undefined
	readonly dataset?: Record<string, unknown> | undefined
	readonly display?: ComparatorConfig | LogicalConfig | undefined
	readonly format?: OperatorConfig | undefined
	readonly scripts?: readonly string[] | undefined
	readonly stylesheets?: readonly string[] | undefined
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type BaseElementConfig<TTag extends ElementTag> = {
	readonly tag: TTag
	readonly attributes: GlobalAttributes
	readonly children: readonly unknown[]
} & SpecialProperties

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type DivConfig = BaseElementConfig<"Div">

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type DivAttributes = GlobalAttributes & SpecialProperties & {
	readonly aria?: AriaAttributes
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type DivConstructor = (
	attributes?: Record<string, unknown>,
) => (children: Array<ElementConfig>) => DivConfig

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type GlobalEmptyAttributes<TTag extends string = string> =
	& GlobalAttributes
	& SpecialProperties
	& {
		readonly aria?: AriaAttributes
		readonly [key: `data-${string}`]: string | number | boolean | undefined
	}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type GlobalEmptyConstructor<TTag extends string = string> = (
	attributes?: GlobalEmptyAttributes<TTag>,
) => GlobalEmptyConfig<TTag>
