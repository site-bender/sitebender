/**
 * Hydrated type definitions for the Engine library
 *
 * These types represent the configuration objects after composition,
 * where operand references have been resolved to OperationFunction instances.
 */

import type { OperationFunction, Value } from "../index.ts"

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
	// Allow optional precision for truncate implementation
	decimalPlaces?: number
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

export interface HydratedArcSine extends HydratedBase {
	tag: "ArcSine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedArcTangent extends HydratedBase {
	tag: "ArcTangent"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedHyperbolicSine extends HydratedBase {
	tag: "HyperbolicSine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedHyperbolicCosine extends HydratedBase {
	tag: "HyperbolicCosine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedHyperbolicTangent extends HydratedBase {
	tag: "HyperbolicTangent"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedArcHyperbolicSine extends HydratedBase {
	tag: "ArcHyperbolicSine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedArcHyperbolicCosine extends HydratedBase {
	tag: "ArcHyperbolicCosine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedArcHyperbolicTangent extends HydratedBase {
	tag: "ArcHyperbolicTangent"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedCosecant extends HydratedBase {
	tag: "Cosecant"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedCotangent extends HydratedBase {
	tag: "Cotangent"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedExponent extends HydratedBase {
	tag: "Exponent"
	type: "operator"
	operand: OperationFunction<number>
}
export interface HydratedLog extends HydratedBase {
	tag: "Log"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedLogBaseTwo extends HydratedBase {
	tag: "LogBaseTwo"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedNaturalLog extends HydratedBase {
	tag: "NaturalLog"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedReciprocal extends HydratedBase {
	tag: "Reciprocal"
	type: "operator"
	operand: OperationFunction<number>
}

// Additional unary operators
export interface HydratedSign extends HydratedBase {
	tag: "Sign"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedArcCosine extends HydratedBase {
	tag: "ArcCosine"
	type: "operator"
	operand: OperationFunction<number>
}

export interface HydratedSecant extends HydratedBase {
	tag: "Secant"
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

export interface HydratedMean extends HydratedBase {
	tag: "Mean"
	type: "operator"
	operands: Array<OperationFunction<number>>
}

export interface HydratedRootMeanSquare extends HydratedBase {
	tag: "RootMeanSquare"
	type: "operator"
	operands: Array<OperationFunction<number>>
}

export interface HydratedRoot extends HydratedBase {
	tag: "Root"
	type: "operator"
	radicand: OperationFunction<number>
	index: OperationFunction<number>
}

export interface HydratedStandardDeviation extends HydratedBase {
	tag: "StandardDeviation"
	type: "operator"
	operands: Array<OperationFunction<number>>
}

export interface HydratedHypotenuse extends HydratedBase {
	tag: "Hypotenuse"
	type: "operator"
	operands: Array<OperationFunction<number>>
}

export interface HydratedMedian extends HydratedBase {
	tag: "Median"
	type: "operator"
	operands: Array<OperationFunction<number>>
}

export interface HydratedMode extends HydratedBase {
	tag: "Mode"
	type: "operator"
	operands: Array<OperationFunction<number>>
}

export interface HydratedProportionedRate extends HydratedBase {
	tag: "ProportionedRate"
	type: "operator"
	table: OperationFunction<unknown>
	amount: OperationFunction<number>
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
	| HydratedArcSine
	| HydratedArcTangent
	| HydratedHyperbolicSine
	| HydratedHyperbolicCosine
	| HydratedHyperbolicTangent
	| HydratedArcHyperbolicSine
	| HydratedArcHyperbolicCosine
	| HydratedArcHyperbolicTangent
	| HydratedCosecant
	| HydratedCotangent
	| HydratedExponent
	| HydratedLog
	| HydratedLogBaseTwo
	| HydratedNaturalLog
	| HydratedReciprocal
	| HydratedSign
	| HydratedSecant
	| HydratedArcCosine
	| HydratedPower
	| HydratedSubtract
	| HydratedDivide
	| HydratedModulo
	| HydratedRemainder
	| HydratedAdd
	| HydratedMultiply
	| HydratedAverage
	| HydratedHypotenuse
	| HydratedMax
	| HydratedMin
	| HydratedMean
	| HydratedRoot
	| HydratedMedian
	| HydratedMode
	| HydratedProportionedRate
	| HydratedRootMeanSquare
	| HydratedStandardDeviation

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
