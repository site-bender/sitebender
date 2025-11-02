//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ElementAttributes<T> = T & {
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	aria?: Record<string, unknown>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	calculation?: unknown

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	dataset?: Record<string, unknown>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	display?: unknown

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	format?: unknown

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	scripts?: Array<string>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	stylesheets?: Array<string>

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	validation?: unknown
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TextNodeConfig = {
	tag: "TextNode"
	content: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type TextNodeConstructor = (content: unknown) => TextNodeConfig

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ChildFilter = (child: unknown) => boolean

export type ComponentType<P> = (props: P) => JSX.Element

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

export type HtmlElement = keyof HTMLElementTagNameMap
