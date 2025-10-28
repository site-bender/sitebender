export type BrandedTypeConfig = {
	readonly name: string
	readonly baseType: "string" | "number" | "boolean" | "object"
	readonly targetFolder?: string
	readonly description?: string
	readonly predicateName?: string
	readonly errorCode?: string
}

export type VariantConfig = {
	readonly name: string
	readonly properties?: ReadonlyArray<{
		readonly name: string
		readonly type: string
	}>
}

export type DiscriminatedUnionConfig = {
	readonly name: string
	readonly variants: ReadonlyArray<VariantConfig>
	readonly targetFolder?: string
	readonly description?: string
	readonly tagCase?: "PascalCase" | "lowercase"
}
