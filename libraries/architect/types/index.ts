// Default export expected by many define components
import type { HtmlElement } from "./JSX/index.ts"

type BaseProps = {
	_template?: string
	_type?: string
	children?: JSX.Element | string | Array<JSX.Element | string>
	disableJsonLd?: boolean
	disableMicrodata?: boolean
	element?: HtmlElement
	isProp?: boolean
}
export default BaseProps

// Re-export schema.org types so define components can import named props from this barrel
export * from "./schema.org/index.ts"
