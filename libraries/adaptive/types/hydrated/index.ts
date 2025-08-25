/**
 * Hydrated type definitions for the Adaptive library
 *
 * These types represent the configuration objects after composition,
 * where operand references have been resolved to OperationFunction instances.
 */

import type { OperationFunction, Value } from "./index.ts"

// ============================================================================
// Base Hydrated Types
// ============================================================================

interface HydratedBase {
	tag: string
	type: string
	datatype: string
}

// ============================================================================
// Hydrated Injector Types
// ============================================================================

export interface HydratedConstant extends HydratedBase {
	tag: "Constant"
	type: "injector"
	value: Value
}

export interface HydratedFromElement extends HydratedBase {
	tag: "FromElement"
	type: "injector"
	source: string
}

export interface HydratedFromArgument extends HydratedBase {
	tag: "FromArgument"
	type: "injector"
	name?: string
}

export interface HydratedFromLocalStorage extends HydratedBase {
	tag: "FromLocalStorage"
	type: "injector"
	key: string
	defaultValue?: Value
	options?: {
		local: string
	}
}

export interface HydratedFromSessionStorage extends HydratedBase {
	tag: "FromSessionStorage"
	type: "injector"
	key: string
	defaultValue?: Value
	options?: {
		local: string
	}
}

export interface HydratedFromQueryString extends HydratedBase {
	tag: "FromQueryString"
	type: "injector"
	key: string
	defaultValue?: Value
	options?: {
		local: string
	}
}

export interface HydratedFromUrlParameter extends HydratedBase {
	tag: "FromUrlParameter"
	type: "injector"
	segment: number
	defaultValue?: Value
}

export interface HydratedFromApi extends HydratedBase {
	tag: "FromApi"
	type: "injector"
	endpoint: string
	method?: "GET" | "POST" | "PUT" | "DELETE"
	headers?: Record<string, string>
	body?: Value
}

// ============================================================================
// Hydrated Operator Types - Unary
// ============================================================================

export interface HydratedAbsoluteValue extends HydratedBase {
	tag: "AbsoluteValue"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedNegate extends HydratedBase {
	tag: "Negate"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedFloor extends HydratedBase {
	tag: "Floor"
	type: "operator"
	decimalPlaces: number
	operand: OperationFunction<number>
}

export interface HydratedCeiling extends HydratedBase {
	tag: "Ceiling"
	type: "operator"
	decimalPlaces: number
	operand: OperationFunction<number>
}

export interface HydratedRound extends HydratedBase {
	tag: "Round"
	type: "operator"
	decimalPlaces: number
	operand: OperationFunction<number>
}

export interface HydratedTruncate extends HydratedBase {
	tag: "Truncate"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedSine extends HydratedBase {
	tag: "Sine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedCosine extends HydratedBase {
	tag: "Cosine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedTangent extends HydratedBase {
	tag: "Tangent"
	type: "operator"
	operand: OperationFunction<number>
}

// ============================================================================
// Hydrated Operator Types - Binary
// ============================================================================

export interface HydratedPower extends HydratedBase {
	tag: "Power"
	type: "operator"
	base: OperationFunction<number>
	exponent: OperationFunction<number>
}

export interface HydratedSubtract extends HydratedBase {
	tag: "Subtract"
	type: "operator"
	minuend: OperationFunction<number>
	subtrahend: OperationFunction<number>
}

export interface HydratedDivide extends HydratedBase {
	tag: "Divide"
	type: "operator"
	dividend: OperationFunction<number>
	divisor: OperationFunction<number>
}

export interface HydratedModulo extends HydratedBase {
	tag: "Modulo"
	type: "operator"
	dividend: OperationFunction<number>
	divisor: OperationFunction<number>
}

export interface HydratedRemainder extends HydratedBase {
	tag: "Remainder"
	type: "operator"
	dividend: OperationFunction<number>
	divisor: OperationFunction<number>
}

// ============================================================================
// Hydrated Operator Types - N-ary
// ============================================================================

export interface HydratedAdd extends HydratedBase {
	tag: "Add"
	type: "operator"
	addends: Array<OperationFunction>
}

export interface HydratedMultiply extends HydratedBase {
	tag: "Multiply"
	type: "operator"
	multipliers: Array<OperationFunction<number>>
}

export interface HydratedAverage extends HydratedBase {
	tag: "Average"
	type: "operator"
	operands: Array<OperationFunction<number>>
}

export interface HydratedMax extends HydratedBase {
	tag: "Max"
	type: "operator"
	operands: Array<OperationFunction<number | string>>
}

export interface HydratedMin extends HydratedBase {
	tag: "Min"
	type: "operator"
	operands: Array<OperationFunction<number | string>>
}

// ============================================================================
// Hydrated Comparator Types
// ============================================================================

export interface HydratedIsEqualTo extends HydratedBase {
	tag: "IsEqualTo"
	type: "comparator"
	operand: OperationFunction
	test: OperationFunction
}

export interface HydratedIsUnequalTo extends HydratedBase {
	tag: "IsUnequalTo"
	type: "comparator"
	operand: OperationFunction
	test: OperationFunction
}

export interface HydratedIsLessThan extends HydratedBase {
	tag: "IsLessThan"
	type: "comparator"
	operand: OperationFunction<number>
	test: OperationFunction<number>
}

export interface HydratedIsMoreThan extends HydratedBase {
	tag: "IsMoreThan"
	type: "comparator"
	operand: OperationFunction<number>
	test: OperationFunction<number>
}

export interface HydratedIsNoLessThan extends HydratedBase {
	tag: "IsNoLessThan"
	type: "comparator"
	operand: OperationFunction<number>
	test: OperationFunction<number>
}

export interface HydratedIsNoMoreThan extends HydratedBase {
	tag: "IsNoMoreThan"
	type: "comparator"
	operand: OperationFunction<number>
	test: OperationFunction<number>
}

export interface HydratedMatches extends HydratedBase {
	tag: "Matches"
	type: "comparator"
	operand: OperationFunction<string>
	pattern: OperationFunction<string>
	flags?: string
}

// ============================================================================
// Hydrated Logical Types
// ============================================================================

export interface HydratedAnd extends HydratedBase {
	tag: "And"
	type: "logical"
	operands: Array<OperationFunction<boolean>>
}

export interface HydratedOr extends HydratedBase {
	tag: "Or"
	type: "logical"
	operands: Array<OperationFunction<boolean>>
}

// ============================================================================
// Union Types
// ============================================================================

export type HydratedInjector =
	| HydratedConstant
	| HydratedFromElement
	| HydratedFromArgument
	| HydratedFromLocalStorage
	| HydratedFromSessionStorage
	| HydratedFromQueryString
	| HydratedFromUrlParameter
	| HydratedFromApi

export type HydratedOperator =
	| HydratedAbsoluteValue
	| HydratedNegate
	| HydratedFloor
	| HydratedCeiling
	| HydratedRound
	| HydratedTruncate
	| HydratedSine
	| HydratedCosine
	| HydratedTangent
	| HydratedPower
	| HydratedSubtract
	| HydratedDivide
	| HydratedModulo
	| HydratedRemainder
	| HydratedAdd
	| HydratedMultiply
	| HydratedAverage
	| HydratedMax
	| HydratedMin

export type HydratedComparator =
	| HydratedIsEqualTo
	| HydratedIsUnequalTo
	| HydratedIsLessThan
	| HydratedIsMoreThan
	| HydratedIsNoLessThan
	| HydratedIsNoMoreThan
	| HydratedMatches

export type HydratedLogical =
	| HydratedAnd
	| HydratedOr

export type HydratedOperation =
	| HydratedInjector
	| HydratedOperator
	| HydratedComparator
	| HydratedLogical
