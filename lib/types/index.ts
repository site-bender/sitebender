// Utility type to extract only the properties added at a specific level
export type ExtractLevelProps<TChild, TParent> = Omit<TChild, keyof TParent>

// Base component props type with generics
export type BaseComponentProps<
	TProps,
	TSchemaType extends string,
	TSubtypeProps,
> = TProps & {
	children?: never
	disableJsonLd?: boolean
	format?: string
	schemaType?: TSchemaType
	subtypeProperties?: TSubtypeProps
}

export type { default } from "./Thing/index.ts"
