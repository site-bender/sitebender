/**
 * Object manipulation type definitions
 *
 * Provides type definitions for object transformation and manipulation operations.
 * These types support functional object transformations throughout the toolkit.
 */

import type { Value } from "../index.ts"

/**
 * Transformation function type
 * A function that transforms a value of type T to any Value type
 *
 * @param value - The value to transform
 * @returns The transformed value
 */
export type Transformation<T = Value> = (value: T) => Value

/**
 * Recursive transformation specification
 * Can be a value, a transformation function, or a nested object of transformations
 * Used for deep object transformations in the evolve function
 */
export type TransformationSpec =
	| Value
	| Transformation
	| Record<string, TransformationSpec>
