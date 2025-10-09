//++ Constants for compiler operation mappings and type inference

import type { BinaryOperator, UnaryOperator } from "../../parser/types/index.ts"
import type {
	BinaryOperation,
	ConstantMetadata,
	NumericDatatype,
	UnaryOperation,
} from "../types/index.ts"

// ============================================================================
// Operator to Semantic Operation Mapping
// ============================================================================

//++ Maps parser operator tokens to semantic operation names
export const BINARY_OPERATOR_TO_OPERATION: Record<
	BinaryOperator,
	BinaryOperation
> = Object.freeze({
	plus: "add",
	minus: "subtract",
	multiply: "multiply",
	divide: "divide",
	power: "power",
})

//++ Maps parser unary operators to semantic operation names
export const UNARY_OPERATOR_TO_OPERATION: Record<
	UnaryOperator,
	UnaryOperation
> = Object.freeze({
	negate: "negate",
	factorial: "factorial",
})

// ============================================================================
// Mathematical Constants
// ============================================================================

//++ Well-known mathematical constants with their values
export const MATHEMATICAL_CONSTANTS: ReadonlyMap<string, ConstantMetadata> =
	new Map(
		Object.entries({
			π: {
				name: "π",
				value: Math.PI,
				datatype: "Number" as NumericDatatype,
			},
			pi: {
				name: "pi",
				value: Math.PI,
				datatype: "Number" as NumericDatatype,
			},
			PI: {
				name: "PI",
				value: Math.PI,
				datatype: "Number" as NumericDatatype,
			},
			e: {
				name: "e",
				value: Math.E,
				datatype: "Number" as NumericDatatype,
			},
			E: {
				name: "E",
				value: Math.E,
				datatype: "Number" as NumericDatatype,
			},
			τ: {
				name: "τ",
				value: Math.PI * 2,
				datatype: "Number" as NumericDatatype,
			},
			tau: {
				name: "tau",
				value: Math.PI * 2,
				datatype: "Number" as NumericDatatype,
			},
			φ: {
				name: "φ",
				value: (1 + Math.sqrt(5)) / 2,
				datatype: "Number" as NumericDatatype,
			},
			phi: {
				name: "phi",
				value: (1 + Math.sqrt(5)) / 2,
				datatype: "Number" as NumericDatatype,
			},
		}),
	)

// ============================================================================
// Default Datatypes
// ============================================================================

//++ Default datatype for numeric literals
export const DEFAULT_NUMERIC_DATATYPE: NumericDatatype = "Number"

//++ Default datatype for unknown variables (will require user specification)
export const DEFAULT_VARIABLE_DATATYPE = "Number"
