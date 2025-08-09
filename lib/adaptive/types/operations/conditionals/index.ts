import type { AllowedNumericOperands } from "../makeCalculator/types"
import type { Operation } from "../operators/index.ts"

import { OPERATION_TAGS } from "../../../constructors/constants/index.ts"
import { AlgebraicOperations, ConditionalOperations } from "./constants"

// Algebraic

export interface AlgebraicBase {
	_tag: typeof OPERATION_TAGS.algebraic
	operands: Array<Operation>
}

export interface AndOperation extends AlgebraicBase {
	operation: typeof AlgebraicOperations.and
}

export interface OrOperation extends AlgebraicBase {
	operation: typeof AlgebraicOperations.or
}

export type AlgebraicOperation = AndOperation | OrOperation

export interface ConditionalBase {
	_tag: typeof OPERATION_TAGS.conditional
	operand: AllowedNumericOperands
	test: AllowedNumericOperands
}

// Number

export type ConditionalOperation =
	| EqualTo
	| LessThan
	| MoreThan
	| NoLessThan
	| NoMoreThan
	| UnequalTo

export interface EqualTo extends ConditionalBase {
	operation: typeof ConditionalOperations.equalTo
}

export interface LessThan extends ConditionalBase {
	operation: typeof ConditionalOperations.lessThan
}

export interface MoreThan extends ConditionalBase {
	operation: typeof ConditionalOperations.moreThan
}

export interface NoLessThan extends ConditionalBase {
	operation: typeof ConditionalOperations.noLessThan
}

export interface NoMoreThan extends ConditionalBase {
	operation: typeof ConditionalOperations.noMoreThan
}

export interface UnequalTo extends ConditionalBase {
	operation: typeof ConditionalOperations.unequalTo
}
