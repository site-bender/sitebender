import type { HtmlElement } from "./JSX/index.ts"

type BaseProps = {
	_template?: string
	_type?: string
	children?: JSX.Element | string | Array<JSX.Element | string>
	disableJsonLd?: boolean
	disableMicrodata?: boolean
	element?: HtmlElement
	isProp?: boolean
	subtypeProperties?: Record<string, unknown>
}

export type Formatter = (
	value: string,
	props?: Record<string, unknown>,
) => JSX.Element
export type Formatters = Record<string, Formatter>
export type TemplateData = Record<string, any>

export default BaseProps
