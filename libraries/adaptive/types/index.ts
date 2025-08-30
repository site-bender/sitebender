/// <reference path="./shims/temporal.d.ts" />
/**
 * Type definitions for the Adaptive library
 *
 * This file contains all the type definitions for the adaptive system,
 * including operators, injectors, comparators, and their configurations.
 */

// ============================================================================
// Base Types
// ============================================================================

export type NumericDatatype = "Number" | "Float" | "Integer" | "Precision"
export type StringDatatype = "String"
export type BooleanDatatype = "Boolean"
export type TemporalDatatype = "Date" | "Time" | "DateTime" | "Duration"
export type ComplexDatatype = "Json" | "Array" | "Map" | "Set"
export type Datatype =
	| NumericDatatype
	| StringDatatype
	| BooleanDatatype
	| TemporalDatatype
	| ComplexDatatype

// Primitive value types
export type PrimitiveValue = string | number | boolean | null | undefined

// Recursive Value type - similar to JSON but more flexible
export type Value =
	| PrimitiveValue
	| Array<Value>
	| { [key: string]: Value }
	| Map<string, Value>
	| Set<Value>
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Record<string | symbol, unknown>
	| Array<unknown>
	| Set<unknown>

// Either type for error handling
export type Left<E> = { left: E }
export type Right<T> = { right: T }
export type Either<E, T> = Left<E> | Right<T>

// Error type
export type AdaptiveError = {
	tag: string
	operation: string
	message: string
}

// ============================================================================
// Injector Types (Leaf Nodes)
// ============================================================================

interface InjectorBase {
	type: "injector"
	datatype: Datatype
}

export interface ConstantInjector extends InjectorBase {
	tag: "Constant"
	value: Value
}

export interface FromElementInjector extends InjectorBase {
	tag: "FromElement"
	source: string // CSS selector
}

export interface FromArgumentInjector extends InjectorBase {
	tag: "FromArgument"
	name?: string
}

export interface FromLocalStorageInjector extends InjectorBase {
	tag: "FromLocalStorage"
	key: string
	defaultValue?: Value
}

export interface FromSessionStorageInjector extends InjectorBase {
	tag: "FromSessionStorage"
	key: string
	defaultValue?: Value
}

export interface FromQueryStringInjector extends InjectorBase {
	tag: "FromQueryString"
	key: string
	defaultValue?: Value
	options?: {
		local: string
	}
}

export interface FromUrlParameterInjector extends InjectorBase {
	tag: "FromUrlParameter"
	segment: number
	defaultValue?: Value
}

export interface FromApiInjector extends InjectorBase {
	tag: "FromApi"
	endpoint: string
	method?: "GET" | "POST" | "PUT" | "DELETE"
	headers?: Record<string, string>
	body?: Value
}

export interface FromLookupInjector extends InjectorBase {
	tag: "FromLookup"
	source: {
		class: string
		id: string
		local: string
	}
	defaultValue?: Value
}

export interface FromLookupTableInjector extends InjectorBase {
	tag: "FromLookupTable"
	column: string
	source: {
		class: string
		local: string
		name: string
	}
	test: Operand
}

// Union of all injector types
export type InjectorConfig =
	| ConstantInjector
	| FromElementInjector
	| FromArgumentInjector
	| FromLocalStorageInjector
	| FromSessionStorageInjector
	| FromQueryStringInjector
	| FromUrlParameterInjector
	| FromApiInjector
	| FromLookupInjector
	| FromLookupTableInjector

// ============================================================================
// Operator Types (Branch Nodes)
// ============================================================================

interface OperatorBase {
	type: "operator"
	datatype: Datatype
}

// Unary operators (single operand)
export interface AbsoluteValueOperator extends OperatorBase {
	tag: "AbsoluteValue"
	datatype: NumericDatatype
	operand: Operand
}

export interface NegateOperator extends OperatorBase {
	tag: "Negate"
	datatype: NumericDatatype
	operand: Operand
}

export interface FloorOperator extends OperatorBase {
	tag: "Floor"
	datatype: NumericDatatype
	decimalPlaces: number
	operand: Operand
}

export interface CeilingOperator extends OperatorBase {
	tag: "Ceiling"
	datatype: NumericDatatype
	decimalPlaces: number
	operand: Operand
}

export interface RoundOperator extends OperatorBase {
	tag: "Round"
	datatype: NumericDatatype
	decimalPlaces: number
	operand: Operand
}

export interface TruncateOperator extends OperatorBase {
	tag: "Truncate"
	datatype: NumericDatatype
	operand: Operand
}

// Binary operators (two operands)
export interface PowerOperator extends OperatorBase {
	tag: "Power"
	datatype: NumericDatatype
	base: Operand
	exponent: Operand
}

export interface SubtractOperator extends OperatorBase {
	tag: "Subtract"
	datatype: NumericDatatype
	minuend: Operand
	subtrahend: Operand
}

export interface DivideOperator extends OperatorBase {
	tag: "Divide"
	datatype: NumericDatatype
	dividend: Operand
	divisor: Operand
}

export interface ModuloOperator extends OperatorBase {
	tag: "Modulo"
	datatype: NumericDatatype
	dividend: Operand
	divisor: Operand
}

export interface RemainderOperator extends OperatorBase {
	tag: "Remainder"
	datatype: NumericDatatype
	dividend: Operand
	divisor: Operand
}

// N-ary operators (multiple operands)
export interface AddOperator extends OperatorBase {
	tag: "Add"
	datatype: NumericDatatype | StringDatatype | TemporalDatatype
	addends: Array<Operand>
}

export interface MultiplyOperator extends OperatorBase {
	tag: "Multiply"
	datatype: NumericDatatype
	multipliers: Array<Operand>
}

export interface AverageOperator extends OperatorBase {
	tag: "Average"
	datatype: NumericDatatype
	operands: Array<Operand>
}

export interface MaxOperator extends OperatorBase {
	tag: "Max"
	datatype: NumericDatatype | StringDatatype | TemporalDatatype
	operands: Array<Operand>
}

export interface MinOperator extends OperatorBase {
	tag: "Min"
	datatype: NumericDatatype | StringDatatype | TemporalDatatype
	operands: Array<Operand>
}

// Trigonometric operators
export interface SineOperator extends OperatorBase {
	tag: "Sine"
	datatype: NumericDatatype
	operand: Operand
}

export interface CosineOperator extends OperatorBase {
	tag: "Cosine"
	datatype: NumericDatatype
	operand: Operand
}

export interface TangentOperator extends OperatorBase {
	tag: "Tangent"
	datatype: NumericDatatype
	operand: Operand
}

export interface ArcSineOperator extends OperatorBase {
	tag: "ArcSine"
	datatype: NumericDatatype
	operand: Operand
}

export interface ArcCosineOperator extends OperatorBase {
	tag: "ArcCosine"
	datatype: NumericDatatype
	operand: Operand
}

export interface ArcTangentOperator extends OperatorBase {
	tag: "ArcTangent"
	datatype: NumericDatatype
	operand: Operand
}

export interface SecantOperator extends OperatorBase {
	tag: "Secant"
	datatype: NumericDatatype
	operand: Operand
}

export interface CosecantOperator extends OperatorBase {
	tag: "Cosecant"
	datatype: NumericDatatype
	operand: Operand
}

export interface CotangentOperator extends OperatorBase {
	tag: "Cotangent"
	datatype: NumericDatatype
	operand: Operand
}

export interface HyperbolicSineOperator extends OperatorBase {
	tag: "HyperbolicSine"
	datatype: NumericDatatype
	operand: Operand
}

export interface HyperbolicCosineOperator extends OperatorBase {
	tag: "HyperbolicCosine"
	datatype: NumericDatatype
	operand: Operand
}

export interface HyperbolicTangentOperator extends OperatorBase {
	tag: "HyperbolicTangent"
	datatype: NumericDatatype
	operand: Operand
}

export interface ArcHyperbolicSineOperator extends OperatorBase {
	tag: "ArcHyperbolicSine"
	datatype: NumericDatatype
	operand: Operand
}

export interface ArcHyperbolicCosineOperator extends OperatorBase {
	tag: "ArcHyperbolicCosine"
	datatype: NumericDatatype
	operand: Operand
}

export interface ArcHyperbolicTangentOperator extends OperatorBase {
	tag: "ArcHyperbolicTangent"
	datatype: NumericDatatype
	operand: Operand
}

export interface LogOperator extends OperatorBase {
	tag: "Log"
	datatype: NumericDatatype
	operand: Operand
}

export interface LogBaseTwoOperator extends OperatorBase {
	tag: "LogBaseTwo"
	datatype: NumericDatatype
	operand: Operand
}

export interface NaturalLogOperator extends OperatorBase {
	tag: "NaturalLog"
	datatype: NumericDatatype
	operand: Operand
}

export interface ExponentOperator extends OperatorBase {
	tag: "Exponent"
	datatype: NumericDatatype
	operand: Operand
}

export interface RootOperator extends OperatorBase {
	tag: "Root"
	datatype: NumericDatatype
	radicand: Operand
	index: Operand
}

export interface HypotenuseOperator extends OperatorBase {
	tag: "Hypotenuse"
	datatype: NumericDatatype
	operands: Array<Operand>
}

export interface ReciprocalOperator extends OperatorBase {
	tag: "Reciprocal"
	datatype: NumericDatatype
	operand: Operand
}

export interface SignOperator extends OperatorBase {
	tag: "Sign"
	datatype: NumericDatatype
	operand: Operand
}

export interface MeanOperator extends OperatorBase {
	tag: "Mean"
	datatype: NumericDatatype
	operands: Array<Operand>
}

export interface MedianOperator extends OperatorBase {
	tag: "Median"
	datatype: NumericDatatype
	operands: Array<Operand>
}

export interface ModeOperator extends OperatorBase {
	tag: "Mode"
	datatype: NumericDatatype
	operands: Array<Operand>
}

export interface StandardDeviationOperator extends OperatorBase {
	tag: "StandardDeviation"
	datatype: NumericDatatype
	operands: Array<Operand>
}

export interface RootMeanSquareOperator extends OperatorBase {
	tag: "RootMeanSquare"
	datatype: NumericDatatype
	operands: Array<Operand>
}

export interface ProportionedRateOperator extends OperatorBase {
	tag: "ProportionedRate"
	datatype: NumericDatatype
	table: Operand
	amount: Operand
}

export interface TernaryOperator extends OperatorBase {
	tag: "Ternary"
	datatype: Datatype
	condition: Operand
	ifTrue: Operand
	ifFalse: Operand
}

// Union of all operator types
export type OperatorConfig =
	| AbsoluteValueOperator
	| NegateOperator
	| FloorOperator
	| CeilingOperator
	| RoundOperator
	| TruncateOperator
	| PowerOperator
	| SubtractOperator
	| DivideOperator
	| ModuloOperator
	| RemainderOperator
	| AddOperator
	| MultiplyOperator
	| AverageOperator
	| MaxOperator
	| MinOperator
	| SineOperator
	| CosineOperator
	| TangentOperator
	| ArcSineOperator
	| ArcCosineOperator
	| ArcTangentOperator
	| SecantOperator
	| CosecantOperator
	| CotangentOperator
	| HyperbolicSineOperator
	| HyperbolicCosineOperator
	| HyperbolicTangentOperator
	| ArcHyperbolicSineOperator
	| ArcHyperbolicCosineOperator
	| ArcHyperbolicTangentOperator
	| LogOperator
	| LogBaseTwoOperator
	| NaturalLogOperator
	| ExponentOperator
	| RootOperator
	| HypotenuseOperator
	| ReciprocalOperator
	| SignOperator
	| MeanOperator
	| MedianOperator
	| ModeOperator
	| StandardDeviationOperator
	| RootMeanSquareOperator
	| ProportionedRateOperator
	| TernaryOperator

// ============================================================================
// Recursive Operand Type
// ============================================================================

// The recursive union - an Operand can be either an operator or an injector
export type Operand = OperatorConfig | InjectorConfig

// ============================================================================
// Comparator Types (for validations)
// ============================================================================

interface ComparatorBase {
	type: "comparator"
	datatype: Datatype
}

export interface IsEqualToComparator extends ComparatorBase {
	tag: "IsEqualTo"
	operand: Operand
	test: Operand
}

export interface IsLessThanComparator extends ComparatorBase {
	tag: "IsLessThan"
	datatype: NumericDatatype | TemporalDatatype
	operand: Operand
	test: Operand
}

export interface IsMoreThanComparator extends ComparatorBase {
	tag: "IsMoreThan"
	datatype: NumericDatatype | TemporalDatatype
	operand: Operand
	test: Operand
}

export interface IsNoLessThanComparator extends ComparatorBase {
	tag: "IsNoLessThan"
	datatype: NumericDatatype | TemporalDatatype
	operand: Operand
	test: Operand
}

export interface IsNoMoreThanComparator extends ComparatorBase {
	tag: "IsNoMoreThan"
	datatype: NumericDatatype | TemporalDatatype
	operand: Operand
	test: Operand
}

export interface IsUnequalToComparator extends ComparatorBase {
	tag: "IsUnequalTo"
	operand: Operand
	test: Operand
}

export interface MatchesComparator extends ComparatorBase {
	tag: "Matches"
	datatype: StringDatatype
	operand: Operand
	pattern: Operand
	flags?: string
}

// Alphabetical comparators
export interface IsAfterAlphabeticallyComparator extends ComparatorBase {
	tag: "IsAfterAlphabetically"
	operand: Operand
	test: Operand
}

export interface IsBeforeAlphabeticallyComparator extends ComparatorBase {
	tag: "IsBeforeAlphabetically"
	operand: Operand
	test: Operand
}

export interface IsNotAfterAlphabeticallyComparator extends ComparatorBase {
	tag: "IsNotAfterAlphabetically"
	operand: Operand
	test: Operand
}

export interface IsNotBeforeAlphabeticallyComparator extends ComparatorBase {
	tag: "IsNotBeforeAlphabetically"
	operand: Operand
	test: Operand
}

export interface IsNotSameAlphabeticallyComparator extends ComparatorBase {
	tag: "IsNotSameAlphabetically"
	operand: Operand
	test: Operand
}

export interface IsSameAlphabeticallyComparator extends ComparatorBase {
	tag: "IsSameAlphabetically"
	operand: Operand
	test: Operand
}

// Date comparators
export interface IsAfterDateComparator extends ComparatorBase {
	tag: "IsAfterDate"
	operand: Operand
	test: Operand
}

export interface IsBeforeDateComparator extends ComparatorBase {
	tag: "IsBeforeDate"
	operand: Operand
	test: Operand
}

export interface IsNotAfterDateComparator extends ComparatorBase {
	tag: "IsNotAfterDate"
	operand: Operand
	test: Operand
}

export interface IsNotBeforeDateComparator extends ComparatorBase {
	tag: "IsNotBeforeDate"
	operand: Operand
	test: Operand
}

export interface IsNotSameDateComparator extends ComparatorBase {
	tag: "IsNotSameDate"
	operand: Operand
	test: Operand
}

export interface IsSameDateComparator extends ComparatorBase {
	tag: "IsSameDate"
	operand: Operand
	test: Operand
}

// DateTime comparators
export interface IsAfterDateTimeComparator extends ComparatorBase {
	tag: "IsAfterDateTime"
	operand: Operand
	test: Operand
}

export interface IsBeforeDateTimeComparator extends ComparatorBase {
	tag: "IsBeforeDateTime"
	operand: Operand
	test: Operand
}

export interface IsSameDateTimeComparator extends ComparatorBase {
	tag: "IsSameDateTime"
	operand: Operand
	test: Operand
}

export interface IsNotAfterDateTimeComparator extends ComparatorBase {
	tag: "IsNotAfterDateTime"
	operand: Operand
	test: Operand
}

export interface IsNotBeforeDateTimeComparator extends ComparatorBase {
	tag: "IsNotBeforeDateTime"
	operand: Operand
	test: Operand
}

// Time comparators
export interface IsAfterTimeComparator extends ComparatorBase {
	tag: "IsAfterTime"
	operand: Operand
	test: Operand
}

export interface IsBeforeTimeComparator extends ComparatorBase {
	tag: "IsBeforeTime"
	operand: Operand
	test: Operand
}

export interface IsNotAfterTimeComparator extends ComparatorBase {
	tag: "IsNotAfterTime"
	operand: Operand
	test: Operand
}

export interface IsNotBeforeTimeComparator extends ComparatorBase {
	tag: "IsNotBeforeTime"
	operand: Operand
	test: Operand
}

export interface IsNotSameTimeComparator extends ComparatorBase {
	tag: "IsNotSameTime"
	operand: Operand
	test: Operand
}

export interface IsSameTimeComparator extends ComparatorBase {
	tag: "IsSameTime"
	operand: Operand
	test: Operand
}

// Length comparators
export interface IsLengthComparator extends ComparatorBase {
	tag: "IsLength"
	operand: Operand
	test: Operand
}

export interface IsLongerThanComparator extends ComparatorBase {
	tag: "IsLongerThan"
	operand: Operand
	test: Operand
}

export interface IsNoLongerThanComparator extends ComparatorBase {
	tag: "IsNoLongerThan"
	operand: Operand
	test: Operand
}

export interface IsNoShorterThanComparator extends ComparatorBase {
	tag: "IsNoShorterThan"
	operand: Operand
	test: Operand
}

export interface IsNotLengthComparator extends ComparatorBase {
	tag: "IsNotLength"
	operand: Operand
	test: Operand
}

export interface IsNotSameLengthComparator extends ComparatorBase {
	tag: "IsNotSameLength"
	operand: Operand
	test: Operand
}

export interface IsSameLengthComparator extends ComparatorBase {
	tag: "IsSameLength"
	operand: Operand
	test: Operand
}

export interface IsShorterThanComparator extends ComparatorBase {
	tag: "IsShorterThan"
	operand: Operand
	test: Operand
}

// Set membership comparator
export interface InSetComparator extends ComparatorBase {
	tag: "InSet"
	operand: Operand
	test: Operand
}

// Matching comparators
export interface DoesNotMatchComparator extends ComparatorBase {
	tag: "DoesNotMatch"
	operand: Operand
	pattern: Operand
	flags?: string
}

// Numerical type comparators
export interface IsIntegerComparator extends ComparatorBase {
	tag: "IsInteger"
	operand: Operand
}

export interface IsPrecisionNumberComparator extends ComparatorBase {
	tag: "IsPrecisionNumber"
	operand: Operand
	precision?: number
}

export interface IsRealNumberComparator extends ComparatorBase {
	tag: "IsRealNumber"
	operand: Operand
}

// Scalar type comparators
export interface IsBooleanComparator extends ComparatorBase {
	tag: "IsBoolean"
	operand: Operand
}

export interface IsNumberComparator extends ComparatorBase {
	tag: "IsNumber"
	operand: Operand
}

export interface IsStringComparator extends ComparatorBase {
	tag: "IsString"
	operand: Operand
}

// Sequence comparators
export interface IsAscendingComparator extends ComparatorBase {
	tag: "IsAscending"
	operand: Operand
}

export interface IsDescendingComparator extends ComparatorBase {
	tag: "IsDescending"
	operand: Operand
}

// Set comparators
export interface IsDisjointSetComparator extends ComparatorBase {
	tag: "IsDisjointSet"
	operand: Operand
	test: Operand
}

export interface IsMemberComparator extends ComparatorBase {
	tag: "IsMember"
	operand: Operand
	test: Operand
}

export interface IsOverlappingSetComparator extends ComparatorBase {
	tag: "IsOverlappingSet"
	operand: Operand
	test: Operand
}

export interface IsSubsetComparator extends ComparatorBase {
	tag: "IsSubset"
	operand: Operand
	test: Operand
}

export interface IsSupersetComparator extends ComparatorBase {
	tag: "IsSuperset"
	operand: Operand
	test: Operand
}

// Temporal type comparators
export interface IsCalendarComparator extends ComparatorBase {
	tag: "IsCalendar"
	operand: Operand
}

export interface IsDurationComparator extends ComparatorBase {
	tag: "IsDuration"
	operand: Operand
}

export interface IsInstantComparator extends ComparatorBase {
	tag: "IsInstant"
	operand: Operand
}

export interface IsPlainDateComparator extends ComparatorBase {
	tag: "IsPlainDate"
	operand: Operand
}

export interface IsPlainDateTimeComparator extends ComparatorBase {
	tag: "IsPlainDateTime"
	operand: Operand
}

export interface IsPlainMonthDayComparator extends ComparatorBase {
	tag: "IsPlainMonthDay"
	operand: Operand
}

export interface IsPlainTimeComparator extends ComparatorBase {
	tag: "IsPlainTime"
	operand: Operand
}

export interface IsPlainYearMonthComparator extends ComparatorBase {
	tag: "IsPlainYearMonth"
	operand: Operand
}

export interface IsTimeZoneComparator extends ComparatorBase {
	tag: "IsTimeZone"
	operand: Operand
}

export interface IsYearWeekComparator extends ComparatorBase {
	tag: "IsYearWeek"
	operand: Operand
}

export interface IsZonedDateTimeComparator extends ComparatorBase {
	tag: "IsZonedDateTime"
	operand: Operand
}

// Vector type comparators
export interface IsArrayComparator extends ComparatorBase {
	tag: "IsArray"
	operand: Operand
}

export interface IsMapComparator extends ComparatorBase {
	tag: "IsMap"
	operand: Operand
}

export interface IsSetComparator extends ComparatorBase {
	tag: "IsSet"
	operand: Operand
}

// ... Add more comparator types as needed

export type ComparatorConfig =
	| DoesNotMatchComparator
	| IsAfterAlphabeticallyComparator
	| IsAfterDateComparator
	| IsAfterDateTimeComparator
	| IsAfterTimeComparator
	| IsArrayComparator
	| IsAscendingComparator
	| IsBeforeAlphabeticallyComparator
	| IsBeforeDateComparator
	| IsBeforeDateTimeComparator
	| IsBeforeTimeComparator
	| IsBooleanComparator
	| IsCalendarComparator
	| IsDescendingComparator
	| IsDisjointSetComparator
	| IsDurationComparator
	| InSetComparator
	| IsEqualToComparator
	| IsInstantComparator
	| IsIntegerComparator
	| IsLengthComparator
	| IsLessThanComparator
	| IsLongerThanComparator
	| IsMapComparator
	| IsMemberComparator
	| IsMoreThanComparator
	| IsNoLessThanComparator
	| IsNoLongerThanComparator
	| IsNoMoreThanComparator
	| IsNoShorterThanComparator
	| IsNotAfterAlphabeticallyComparator
	| IsNotAfterDateComparator
	| IsNotAfterDateTimeComparator
	| IsNotAfterTimeComparator
	| IsNotBeforeAlphabeticallyComparator
	| IsNotBeforeDateComparator
	| IsNotBeforeDateTimeComparator
	| IsNotBeforeTimeComparator
	| IsNotLengthComparator
	| IsNotSameAlphabeticallyComparator
	| IsNotSameDateComparator
	| IsNotSameLengthComparator
	| IsNotSameTimeComparator
	| IsNumberComparator
	| IsOverlappingSetComparator
	| IsPlainDateComparator
	| IsPlainDateTimeComparator
	| IsPlainMonthDayComparator
	| IsPlainTimeComparator
	| IsPlainYearMonthComparator
	| IsPrecisionNumberComparator
	| IsRealNumberComparator
	| IsSameAlphabeticallyComparator
	| IsSameDateComparator
	| IsSameDateTimeComparator
	| IsSameLengthComparator
	| IsSameTimeComparator
	| IsSetComparator
	| IsShorterThanComparator
	| IsStringComparator
	| IsSubsetComparator
	| IsSupersetComparator
	| IsTimeZoneComparator
	| IsUnequalToComparator
	| IsYearWeekComparator
	| IsZonedDateTimeComparator
	| MatchesComparator

// ============================================================================
// Logical Types (for combining comparators)
// ============================================================================

interface LogicalBase {
	type: "logical"
	datatype?: BooleanDatatype
}

export interface AndLogical extends LogicalBase {
	tag: "And"
	operands: Array<ComparatorConfig | LogicalConfig>
}

export interface OrLogical extends LogicalBase {
	tag: "Or"
	operands: Array<ComparatorConfig | LogicalConfig>
}

export type LogicalConfig =
	| AndLogical
	| OrLogical

// ============================================================================
// Function Types
// ============================================================================

// LocalValues is a cache/injection object for memoization and testing
export type LocalValues = Record<string, Value>

// The async operation function signature
export type OperationFunction<T = unknown> = (
	arg: unknown,
	localValues?: LocalValues,
) => Promise<Either<Array<AdaptiveError>, T>>

// Constructor function types
export type UnaryOperatorConstructor<Config extends OperatorConfig> = (
	datatype?: Datatype,
) => (operand: Operand) => Config

export type BinaryOperatorConstructor<Config extends OperatorConfig> = (
	datatype?: Datatype,
) => (operand1: Operand) => (operand2: Operand) => Config

export type NaryOperatorConstructor<Config extends OperatorConfig> = (
	datatype?: Datatype,
) => (operands: Array<Operand>) => Config

// ============================================================================
// Utility Types
// ============================================================================

// Extract specific operator by tag
export type ExtractOperator<T extends string> = Extract<
	OperatorConfig,
	{ tag: T }
>

// Extract specific injector by tag
export type ExtractInjector<T extends string> = Extract<
	InjectorConfig,
	{ tag: T }
>

// Check if a config is an operator
export const isOperator = (config: Operand): config is OperatorConfig => {
	return config.type === "operator"
}

// Check if a config is an injector
export const isInjector = (config: Operand): config is InjectorConfig => {
	return config.type === "injector"
}

// Check if a result is an error
export const isLeft = <E, T>(result: Either<E, T>): result is Left<E> => {
	return "left" in result
}

// Check if a result is a success
export const isRight = <E, T>(result: Either<E, T>): result is Right<T> => {
	return "right" in result
}

// Check if something is a valid Value type
export const isValue = (val: unknown): val is Value => {
	if (val === null || val === undefined) return true

	const type = typeof val
	if (type === "string" || type === "number" || type === "boolean") return true

	if (Array.isArray(val)) {
		return (val as Array<unknown>).every(isValue)
	}

	if (val instanceof Map || val instanceof Set) {
		return true // Maps and Sets are allowed
	}

	if (type === "object") {
		// Plain object
		return Object.values(val as Record<string, unknown>).every(isValue)
	}

	return false
}
