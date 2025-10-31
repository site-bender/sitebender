//++ Type definitions for error generator
//++ Used to configure generation of error types and constructors

export type ErrorField = {
	readonly name: string // Field name (camelCase)
	readonly type: string // TypeScript type
	readonly description?: string // Description for documentation
}

export type ErrorVariant = {
	readonly tag: string // Discriminator tag (e.g., "NetworkError")
	readonly description: string // What this error represents
	readonly fields: ReadonlyArray<ErrorField> // Additional fields beyond _tag
}

export type ErrorTypeConfig = {
	readonly name: string // Base error type name (e.g., "AppError")
	readonly variants: ReadonlyArray<ErrorVariant> // Error variants in the union
	readonly baseType?: "ValidationError" // Optional base to extend
	readonly description?: string // Description of the error type
}

export type ErrorConstructorConfig = {
	readonly errorType: string // Name of the error type to construct
	readonly variant: string // Which variant to construct
	readonly description?: string // Description of what constructor does
}

export type GeneratorOptions = {
	readonly outputPath?: string // Where to write generated file
	readonly includeExamples?: boolean // Include usage examples
	readonly includeTests?: boolean // Generate test file
}
