import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ElementAttributes<T> = T & {
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	aria?: Record<string, unknown>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	calculation?: Operand

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	dataset?: Record<string, unknown>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	display?: ComparatorConfig | LogicalConfig

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	format?: OperatorConfig

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	scripts?: Array<string>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	stylesheets?: Array<string>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	validation?: ComparatorConfig | LogicalConfig
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TextNodeConfig = {
	tag: "TextNode"
	content: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TextNodeConstructor = (content: unknown) => TextNodeConfig

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ChildFilter = (child: ElementConfig) => boolean

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
