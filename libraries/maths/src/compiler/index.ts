import type {
	ComparatorConfig,
	InjectorConfig,
	NumericDatatype,
	OperatorConfig,
} from "../../../engine/types/index.ts"
import type {
	ASTNode,
	ParseError,
	Result,
	VariableMap,
} from "../types/index.ts"

import IsLessThan from "../../../engine/src/constructors/comparators/amount/IsLessThan/index.ts"
import IsMoreThan from "../../../engine/src/constructors/comparators/amount/IsMoreThan/index.ts"
import IsNoLessThan from "../../../engine/src/constructors/comparators/amount/IsNoLessThan/index.ts"
import IsNoMoreThan from "../../../engine/src/constructors/comparators/amount/IsNoMoreThan/index.ts"
import IsEqualTo from "../../../engine/src/constructors/comparators/equality/IsEqualTo/index.ts"
import IsUnequalTo from "../../../engine/src/constructors/comparators/equality/IsUnequalTo/index.ts"
import Add from "../../../engine/src/constructors/operators/Add/index.ts"
import Divide from "../../../engine/src/constructors/operators/Divide/index.ts"
import Multiply from "../../../engine/src/constructors/operators/Multiply/index.ts"
import Negate from "../../../engine/src/constructors/operators/Negate/index.ts"
import Power from "../../../engine/src/constructors/operators/Power/index.ts"
import Subtract from "../../../engine/src/constructors/operators/Subtract/index.ts"
import Ternary from "../../../engine/src/constructors/operators/Ternary/index.ts"
import inferNumericType from "./inferNumericType/index.ts"

/**
 * Compiles an AST node into an engine configuration using engine constructors.
 * Transforms the parsed AST into executable engine operator configurations.
 *
 * @param ast - Abstract Syntax Tree node to compile
 * @param variables - Map of variable names to injector configurations
 * @returns Result containing engine configuration or parse error
 *
 * @example
 * ```typescript
 * // Example 1: Compile a number literal
 * const ast = { type: "Number", value: 42 }
 * const result = compile(ast, {})
 * // Returns: { ok: true, value: { tag: "Constant", type: "injector", datatype: "Number", value: 42 } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 2: Compile a variable reference
 * const ast = { type: "Variable", name: "x" }
 * const variables = { x: { tag: "FromElement", type: "injector", datatype: "Number", source: "#input" } }
 * const result = compile(ast, variables)
 * // Returns: { ok: true, value: { tag: "FromElement", type: "injector", datatype: "Number", source: "#input" } }
 * ```
 *
 * @example
 * ```typescript
 * // Example 3: Compile binary addition
 * const ast = {
 *   type: "BinaryOp",
 *   operator: "+",
 *   left: { type: "Variable", name: "a" },
 *   right: { type: "Variable", name: "b" }
 * }
 * const variables = {
 *   a: { tag: "Constant", type: "injector", datatype: "Integer", value: 5 },
 *   b: { tag: "Constant", type: "injector", datatype: "Integer", value: 3 }
 * }
 * const result = compile(ast, variables)
 * // Returns: Add configuration with Integer datatype
 * ```
 *
 * @example
 * ```typescript
 * // Example 4: Compile unary negation
 * const ast = {
 *   type: "UnaryOp",
 *   operator: "-",
 *   operand: { type: "Number", value: 5 }
 * }
 * const result = compile(ast, {})
 * // Returns: Negate configuration wrapping Constant(5)
 * ```
 *
 * @example
 * ```typescript
 * // Example 5: Error on undefined variable
 * const ast = { type: "Variable", name: "unknown" }
 * const result = compile(ast, {})
 * // Returns: { ok: false, error: { message: "Undefined variable: unknown" } }
 * ```
 */
export default function compile(
	ast: ASTNode,
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
			return { ok: true, value: config }
		}

		case "Variable": {
			// Look up variable in the map
			const injector = variables[ast.name]
			if (!injector) {
				return {
					ok: false,
					error: {
						message: `Undefined variable: ${ast.name}`,
					},
				}
			}
			return { ok: true, value: injector }
		}

		case "UnaryOp": {
			// Compile the operand
			const operandResult = compile(ast.operand, variables)
			// deno-coverage-ignore
			if (!operandResult.ok) return operandResult

			// For unary minus, use Negate
			if (ast.operator === "-") {
				// Infer type from operand
				const datatype = operandResult.value.datatype
				const numericType: NumericDatatype = [
						"Number",
						"Float",
						"Integer",
						"Precision",
					].includes(datatype)
					? (datatype as NumericDatatype)
					: "Number"

				const config = Negate(numericType)(operandResult.value as any)
				return { ok: true, value: config }
			}

			// Unary plus is a no-op, just return the operand
			return operandResult
		}

		case "BinaryOp": {
			// Compile both operands
			const leftResult = compile(ast.left, variables)
			// deno-coverage-ignore
			if (!leftResult.ok) return leftResult

			const rightResult = compile(ast.right, variables)
			if (!rightResult.ok) return rightResult

			const left = leftResult.value
			const right = rightResult.value

			// Apply the appropriate constructor based on operator
			// Note: Cast to any since our compile can return ComparatorConfig too
			switch (ast.operator) {
				case "+": {
					// Addition can handle multiple types
					const datatype = inferNumericType([
						left as any,
						right as any,
					])
					const config = Add(datatype)([left as any, right as any])
					return { ok: true, value: config }
				}

				case "-": {
					const datatype = inferNumericType([
						left as any,
						right as any,
					])
					const config = Subtract(datatype)(left as any)(right as any)
					return { ok: true, value: config }
				}

				case "*": {
					const datatype = inferNumericType([
						left as any,
						right as any,
					])
					const config = Multiply(datatype)([
						left as any,
						right as any,
					])
					return { ok: true, value: config }
				}

				case "/": {
					const datatype = inferNumericType([
						left as any,
						right as any,
					])
					const config = Divide(datatype)(left as any)(right as any)
					return { ok: true, value: config }
				}

				case "^": {
					const datatype = inferNumericType([
						left as any,
						right as any,
					])
					const config = Power(datatype)(left as any)(right as any)
					return { ok: true, value: config }
				}

				default:
					return {
						ok: false,
						error: {
							message: `Unsupported operator`,
						},
					}
			}
		}

		case "Comparison": {
			// Compile both operands
			const leftResult = compile(ast.left, variables)
			// deno-coverage-ignore
			if (!leftResult.ok) return leftResult

			const rightResult = compile(ast.right, variables)
			// deno-coverage-ignore - error propagation, tested through other paths
			if (!rightResult.ok) return rightResult

			const left = leftResult.value
			const right = rightResult.value
			const datatype = inferNumericType([left as any, right as any])

			// Apply the appropriate comparison constructor
			// Note: Comparators expect Operand types, but our compile result includes
			// ComparatorConfig. We cast to any to work around this type limitation.
			switch (ast.operator) {
				case "<": {
					const config = IsLessThan(datatype)(left as any)(
						right as any,
					)
					return { ok: true, value: config as any }
				}
				case ">": {
					const config = IsMoreThan(datatype)(left as any)(
						right as any,
					)
					return { ok: true, value: config as any }
				}
				case "==": {
					const config = IsEqualTo(datatype)(left as any)(
						right as any,
					)
					return { ok: true, value: config as any }
				}
				case "!=": {
					const config = IsUnequalTo(datatype)(left as any)(
						right as any,
					)
					return { ok: true, value: config as any }
				}
				case "<=": {
					const config = IsNoMoreThan(datatype)(left as any)(
						right as any,
					)
					return { ok: true, value: config as any }
				}
				case ">=": {
					const config = IsNoLessThan(datatype)(left as any)(
						right as any,
					)
					return { ok: true, value: config as any }
				}
				// deno-coverage-ignore - Type exhaustiveness check, all operators handled
				default:
					return {
						ok: false,
						error: {
							message: `Unsupported comparison operator: ${
								(ast as any).operator
							}`,
						},
					}
			}
		}

		case "Conditional": {
			// Compile condition
			const conditionResult = compile(ast.condition, variables)
			// deno-coverage-ignore
			if (!conditionResult.ok) return conditionResult

			// Compile ifTrue branch
			const ifTrueResult = compile(ast.ifTrue, variables)
			// deno-coverage-ignore
			if (!ifTrueResult.ok) return ifTrueResult

			// Compile ifFalse branch
			const ifFalseResult = compile(ast.ifFalse, variables)
			// deno-coverage-ignore - error propagation, tested through other paths
			if (!ifFalseResult.ok) return ifFalseResult

			// Infer the datatype from the two branches
			const datatype = inferNumericType([
				ifTrueResult.value as any,
				ifFalseResult.value as any,
			])

			// Create ternary operator
			// Note: The engine's Ternary expects Operand for condition, but comparators
			// work as conditions. We cast to any to work around this type limitation.
			const config = Ternary(datatype)(
				conditionResult.value as any,
				ifTrueResult.value as any,
				ifFalseResult.value as any,
			)
			return { ok: true, value: config }
		}

		default: {
			// Type guard - this should never happen
			const _exhaustive: never = ast
			return {
				ok: false,
				error: {
					message: `Unknown AST node type`,
				},
			}
		}
	}
}
