import type {
	ComparatorConfig,
	InjectorConfig,
	NumericDatatype,
	Operand,
	OperatorConfig,
} from "../../../architect/types/index.ts"
import type {
	Left,
	Right,
} from "../../../toolsmith/src/types/fp/either/index.ts"
import type {
	AstNode,
	ParseError,
	Result,
	VariableMap,
} from "../types/index.ts"

import IsLessThan from "../../../architect/src/constructors/comparators/amount/IsLessThan/index.ts"
import IsMoreThan from "../../../architect/src/constructors/comparators/amount/IsMoreThan/index.ts"
import IsNoLessThan from "../../../architect/src/constructors/comparators/amount/IsNoLessThan/index.ts"
import IsNoMoreThan from "../../../architect/src/constructors/comparators/amount/IsNoMoreThan/index.ts"
import IsEqualTo from "../../../architect/src/constructors/comparators/equality/IsEqualTo/index.ts"
import IsUnequalTo from "../../../architect/src/constructors/comparators/equality/IsUnequalTo/index.ts"
import Add from "../../../architect/src/constructors/operators/Add/index.ts"
import Divide from "../../../architect/src/constructors/operators/Divide/index.ts"
import Multiply from "../../../architect/src/constructors/operators/Multiply/index.ts"
import Negate from "../../../architect/src/constructors/operators/Negate/index.ts"
import Power from "../../../architect/src/constructors/operators/Power/index.ts"
import Subtract from "../../../architect/src/constructors/operators/Subtract/index.ts"
import Ternary from "../../../architect/src/constructors/operators/Ternary/index.ts"
import inferNumericType from "./inferNumericType/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function compile(
	ast: AstNode,
	variables: VariableMap,
): Result<OperatorConfig | InjectorConfig | ComparatorConfig, ParseError> {
	switch (ast.type) {
		case "Number": {
			// Numbers become Constant injectors
			const config: InjectorConfig = {
				tag: "Constant",
				type: "injector",
				datatype: "Number",
				value: ast.value,
			}
			return { _tag: "Right", right: config } as Right<
				OperatorConfig | InjectorConfig | ComparatorConfig
			>
		}

		case "Variable": {
			// Look up variable in the map
			const injector = variables[ast.name]
			if (!injector) {
				return {
					_tag: "Left",
					left: { message: `Undefined variable: ${ast.name}` },
				} as Left<ParseError>
			}
			return { _tag: "Right", right: injector } as Right<
				OperatorConfig | InjectorConfig | ComparatorConfig
			>
		}

		case "UnaryOp": {
			// Compile the operand
			const operandResult = compile(ast.operand, variables)
			// deno-coverage-ignore
			if (operandResult._tag === "Left") return operandResult

			// For unary minus, use Negate
			if (ast.operator === "-") {
				// Disallow comparator as unary operand
				if (operandResult.right.type === "comparator") {
					return {
						_tag: "Left",
						left: { message: "Unary operator requires a value operand" },
					} as Left<ParseError>
				}

				const operand: Operand = operandResult.right
				// Infer type from operand
				const datatype = operand.datatype
				const numericType: NumericDatatype = [
						"Number",
						"Float",
						"Integer",
						"Precision",
					].includes(datatype)
					? (datatype as NumericDatatype)
					: "Number"

				const config = Negate(numericType)(operand)
				return { _tag: "Right", right: config } as Right<
					OperatorConfig | InjectorConfig | ComparatorConfig
				>
			}

			// Unary plus is a no-op, just return the operand
			return operandResult
		}

		case "BinaryOp": {
			// Compile both operands
			const leftResult = compile(ast.left, variables)
			// deno-coverage-ignore
			if (leftResult._tag === "Left") return leftResult

			const rightResult = compile(ast.right, variables)
			if (rightResult._tag === "Left") return rightResult

			// Disallow comparator operands for arithmetic operators
			if (
				leftResult.right.type === "comparator" ||
				rightResult.right.type === "comparator"
			) {
				return {
					_tag: "Left",
					left: { message: "Binary operator requires value operands" },
				} as Left<ParseError>
			}

			const left: Operand = leftResult.right
			const right: Operand = rightResult.right

			// Apply the appropriate constructor based on operator
			// Note: Cast to any since our compile can return ComparatorConfig too
			switch (ast.operator) {
				case "+": {
					// Addition can handle multiple types
					const datatype = inferNumericType([left, right])
					const config = Add(datatype)([left, right])
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}

				case "-": {
					const datatype = inferNumericType([left, right])
					const config = Subtract(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}

				case "*": {
					const datatype = inferNumericType([left, right])
					const config = Multiply(datatype)([left, right])
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}

				case "/": {
					const datatype = inferNumericType([left, right])
					const config = Divide(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}

				case "^": {
					const datatype = inferNumericType([left, right])
					const config = Power(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}

				default:
					return {
						_tag: "Left",
						left: { message: "Unsupported operator" },
					} as Left<ParseError>
			}
		}

		case "Comparison": {
			// Compile both operands
			const leftResult = compile(ast.left, variables)
			// deno-coverage-ignore
			if (leftResult._tag === "Left") return leftResult

			const rightResult = compile(ast.right, variables)
			// deno-coverage-ignore - error propagation, tested through other paths
			if (rightResult._tag === "Left") return rightResult

			if (
				leftResult.right.type === "comparator" ||
				rightResult.right.type === "comparator"
			) {
				return {
					_tag: "Left",
					left: { message: "Comparison operands must be values" },
				} as Left<ParseError>
			}

			const left: Operand = leftResult.right
			const right: Operand = rightResult.right
			const datatype = inferNumericType([left, right])

			// Apply the appropriate comparison constructor
			// Note: Comparators expect Operand types, but our compile result includes
			// ComparatorConfig. We cast to any to work around this type limitation.
			switch (ast.operator) {
				case "<": {
					const config = IsLessThan(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}
				case ">": {
					const config = IsMoreThan(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}
				case "==": {
					const config = IsEqualTo(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}
				case "!=": {
					const config = IsUnequalTo(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}
				case "<=": {
					const config = IsNoMoreThan(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}
				case ">=": {
					const config = IsNoLessThan(datatype)(left)(right)
					return { _tag: "Right", right: config } as Right<
						OperatorConfig | InjectorConfig | ComparatorConfig
					>
				}
				// deno-coverage-ignore - Type exhaustiveness check, all operators handled
				default: {
					return {
						_tag: "Left",
						left: { message: "Unsupported comparison operator" },
					} as Left<ParseError>
				}
			}
		}

		case "Conditional": {
			// Compile condition
			const conditionResult = compile(ast.condition, variables)
			// deno-coverage-ignore
			if (conditionResult._tag === "Left") return conditionResult

			// Compile ifTrue branch
			const ifTrueResult = compile(ast.ifTrue, variables)
			// deno-coverage-ignore
			if (ifTrueResult._tag === "Left") return ifTrueResult

			// Compile ifFalse branch
			const ifFalseResult = compile(ast.ifFalse, variables)
			// deno-coverage-ignore - error propagation, tested through other paths
			if (ifFalseResult._tag === "Left") return ifFalseResult

			// Ensure branches are value operands
			if (
				ifTrueResult.right.type === "comparator" ||
				ifFalseResult.right.type === "comparator"
			) {
				return {
					_tag: "Left",
					left: { message: "Ternary branches must be value operands" },
				} as Left<ParseError>
			}

			const ifTrue: Operand = ifTrueResult.right
			const ifFalse: Operand = ifFalseResult.right

			// Infer the datatype from the two branches
			const datatype = inferNumericType([ifTrue, ifFalse])

			// Create ternary operator
			// Note: Architect's Ternary expects Operand for condition; comparators are also supported at runtime.
			const conditionOperand: Operand = conditionResult.right as Operand
			const config = Ternary(datatype)(conditionOperand, ifTrue, ifFalse)
			return { _tag: "Right", right: config } as Right<
				OperatorConfig | InjectorConfig | ComparatorConfig
			>
		}

		default: {
			// Type guard - this should never happen
			const _exhaustive: never = ast
			return {
				_tag: "Left",
				left: { message: "Unknown AST node type" },
			} as Left<ParseError>
		}
	}
}
