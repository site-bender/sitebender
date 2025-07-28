// Utility type to extract only the properties added at a specific level
export type ExtractLevelProps<TChild, TParent> = Omit<TChild, keyof TParent>

// Base component props type with generics
export type BaseComponentProps<
	TProps,
	TSubtypeProps,
> = TProps & {
	children?: never
	disableJsonLd?: boolean
	format?: string
	schemaType?: string
	subtypeProperties?: TSubtypeProps
}

type BaseProps = {
	children?: never
	disableJsonLd?: boolean
	format?: string
	schemaType?: string
	subtypeProperties?: Record<string, unknown>
}

export default BaseProps
