export type CastType =
	| "boolean" // Convert to boolean (truthy/falsy)
	| "float" // Convert to floating-point number
	| "integer" // Convert to integer (whole number)
	| "string" // Convert to string representation

export type CastResult<T extends CastType> = T extends "boolean" ? boolean
	: T extends "float" ? number
	: T extends "integer" ? number
	: T extends "string" ? string
	: never
