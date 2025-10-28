//++ Type definitions for component generator configuration

export type ComponentConfig = {
	readonly name: string
	readonly targetFolder?: string
	readonly tagName: string
	readonly description?: string
	readonly isHtmlElement?: boolean
}

export type GeneratorOptions = {
	readonly keepConfig?: boolean
}
