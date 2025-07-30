type BaseProps = {
	_template?: string
	_type?: string
	children?: never
	disableJsonLd?: boolean
	disableMicrodata?: boolean
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
