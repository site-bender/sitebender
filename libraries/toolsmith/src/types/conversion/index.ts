/**
 * Type conversion definitions
 *
 * Provides type definitions for value conversion and casting operations.
 * These types support safe type conversions throughout the toolsmith.
 */

/**
 * Supported cast types for value conversion
 * Each type represents a target type for casting operations
 */
export type CastType =
	| "boolean" // Convert to boolean (truthy/falsy)
	| "float" // Convert to floating-point number
	| "integer" // Convert to integer (whole number)
	| "string" // Convert to string representation

/**
 * Mapped type for cast operation results
 * Maps each CastType to its corresponding TypeScript type
 */
export type CastResult<T extends CastType> = T extends "boolean" ? boolean
	: T extends "float" ? number
	: T extends "integer" ? number
	: T extends "string" ? string
	: never
