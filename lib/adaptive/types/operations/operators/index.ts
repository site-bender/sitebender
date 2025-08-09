import type {
	InjectArgument,
	InjectConstant,
	InjectFromForm,
	InjectFromMap,
} from "../injectors/index.ts"
import type { TernaryOperation } from "../makeTernary/types"

import {
	MATH_OPERATORS,
	OPERATION_TAGS,
} from "../../../constructors/constants/index.ts"

export type AllowedNumericOperands =
	| InjectArgument<"number">
	| InjectConstant<"number">
	| InjectFromForm<"number">
	| InjectFromMap<"number">
	| NumericOperation
	| TernaryOperation

export interface NumericBase {
	tag: typeof OPERATION_TAGS.numeric
	precision?: InjectConstant<"number">
}

export interface AddOperation extends NumericBase {
	addends: Array<AllowedNumericOperands>
	type: typeof OPERAND_TYPES.operator
	operation: typeof MATH_OPERATORS.add
}

export interface CeilingOperation extends NumericBase {
	operand: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.ceiling
}

export interface DivideOperation extends NumericBase {
	dividend: AllowedNumericOperands
	divisor: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.divide
}

export interface FloorOperation extends NumericBase {
	operand: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.floor
}

export interface MaxOperation extends NumericBase {
	this: AllowedNumericOperands
	that: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.max
}

export interface MultiplyOperation extends NumericBase {
	multipliers: Array<AllowedNumericOperands>
	operation: typeof MATH_OPERATORS.multiply
}

export interface NegateOperation extends NumericBase {
	operand: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.negate
}

export interface PowerOperation extends NumericBase {
	base: AllowedNumericOperands
	exponent: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.power
}

export interface RootOperation extends NumericBase {
	index: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.root
	radicand: AllowedNumericOperands
}

export interface RoundOperation extends NumericBase {
	decimalPlaces?: number
	operand: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.round
}

export interface SubtractOperation extends NumericBase {
	minuend: AllowedNumericOperands
	operation: typeof MATH_OPERATORS.subtract
	subtrahend: AllowedNumericOperands
}

export interface TruncateOperation extends NumericBase {
	decimalPlaces?: number
	operation: typeof MATH_OPERATORS.truncate
	method: "round" | "ceiling" | "floor" | "truncate"
	operand: AllowedNumericOperands
}

export type NumericOperation =
	| AddOperation
	| CeilingOperation
	| DivideOperation
	| FloorOperation
	| MaxOperation
	| MultiplyOperation
	| NegateOperation
	| PowerOperation
	| RootOperation
	| RoundOperation
	| SubtractOperation
	| TruncateOperation
