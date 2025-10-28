//++ Type definitions for function generator configuration

export type Conjunction = "To" | "With" | "For"

export type Parameter = {
	readonly name: string
	readonly type: string
}

export type FunctionConfig = {
	readonly name: string
	readonly targetFolder?: string
	readonly conjunction?: Conjunction
	readonly parameters: ReadonlyArray<Parameter>
	readonly returns: string
	readonly description?: string
	readonly generic?: string
}

export type GeneratorOptions = {
	readonly targetDirectory?: string
	readonly keepConfig?: boolean
}
