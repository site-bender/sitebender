import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ConstantExtractionError } from "../types/errors/index.ts"

import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _reduceTemplatePart from "./_reduceTemplatePart/index.ts"
import _serializeObjectProperty from "./_serializeObjectProperty/index.ts"
import _serializeArrayElement from "./_serializeArrayElement/index.ts"
import _serializeCallArgument from "./_serializeCallArgument/index.ts"
import _serializePattern from "../../_serializePattern/index.ts"

//++ Serialize an AST expression node to its string representation
//++ Handles all expression types: literals, operators, objects, arrays, calls, functions
//++ Returns Result with serialized expression or error for unsupported nodes
//++
//++ @param node - Expression node
//++ @returns Result<ConstantExtractionError, string>
//++
//++ Supported expression types:
//++ - Literals: NumericLiteral, StringLiteral, BooleanLiteral, NullLiteral, Identifier
//++ - Operators: BinaryExpression, UnaryExpression
//++ - Access: MemberExpression
//++ - Templates: TemplateLiteral
//++ - Collections: ObjectExpression, ArrayExpression
//++ - Calls: CallExpression
//++ - Functions: ArrowFunctionExpression, FunctionExpression
//++ - Conditionals: ConditionalExpression
//++
//++ Error kinds:
//++ - UnsupportedExpressionType: unrecognized or unsupported expression type
//++ - MissingValue: missing required value in expression node
export default function _serializeExpression(
	node: unknown,
): Result<ConstantExtractionError, string> {
	if (!node) {
		return ok("undefined")
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string | undefined

	// Helper to create ConstantExtractionError
	function makeConstantError(
		kind: ConstantExtractionError["kind"],
		message: string,
	): Result<ConstantExtractionError, string> {
		const baseError = createError("extractConstants")([])(message)(
			"INVALID_ARGUMENT",
		)

		// Spread base error but exclude context (incompatible types)
		const { context: _unused, ...baseErrorFields } = baseError

		const constantError: ConstantExtractionError = {
			...baseErrorFields,
			kind,
		}

		return error(constantError)
	}

	if (!nodeType) {
		return makeConstantError(
			"UnsupportedExpressionType",
			"Expression node has no type property",
		)
	}

	// Pattern matching via serializer map
	const serializers: Record<
		string,
		(n: Record<string, unknown>) => Result<ConstantExtractionError, string>
	> = {
		NumericLiteral: function serializeNumericLiteral(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const value = n.value
			return ok(String(value))
		},

		StringLiteral: function serializeStringLiteral(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const value = n.value
			return ok(`"${value}"`)
		},

		BooleanLiteral: function serializeBooleanLiteral(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const value = n.value
			return ok(String(value))
		},

		NullLiteral: function serializeNullLiteral(
			_n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			return ok("null")
		},

		Identifier: function serializeIdentifier(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const value = n.value as string | undefined

			if (!value) {
				return makeConstantError("MissingValue", "Identifier has no value")
			}

			if (isEqual(value)("undefined")) {
				return ok("undefined")
			}

			return ok(value)
		},

		TemplateLiteral: function serializeTemplateLiteral(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const quasis = (n.quasis as ReadonlyArray<Record<string, unknown>>) ?? []
			const expressions = (n.expressions as ReadonlyArray<unknown>) ?? []

			const result = _reduceTemplatePart(expressions)(quasis)

			if (result._tag === "Error") {
				return result
			}

			return ok("`" + result.value + "`")
		},

		BinaryExpression: function serializeBinaryExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const leftResult = _serializeExpression(n.left)

			if (leftResult._tag === "Error") {
				return leftResult
			}

			const rightResult = _serializeExpression(n.right)

			if (rightResult._tag === "Error") {
				return rightResult
			}

			const operator = n.operator as string | undefined

			if (!operator) {
				return makeConstantError(
					"MissingValue",
					"BinaryExpression has no operator",
				)
			}

			return ok(`${leftResult.value} ${operator} ${rightResult.value}`)
		},

		UnaryExpression: function serializeUnaryExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const argumentResult = _serializeExpression(n.argument)

			if (argumentResult._tag === "Error") {
				return argumentResult
			}

			const operator = n.operator as string | undefined

			if (!operator) {
				return makeConstantError(
					"MissingValue",
					"UnaryExpression has no operator",
				)
			}

			return ok(`${operator}${argumentResult.value}`)
		},

		MemberExpression: function serializeMemberExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const objectResult = _serializeExpression(n.object)

			if (objectResult._tag === "Error") {
				return objectResult
			}

			const propertyResult = _serializeExpression(n.property)

			if (propertyResult._tag === "Error") {
				return propertyResult
			}

			const computed = n.computed as boolean | undefined

			if (computed) {
				return ok(`${objectResult.value}[${propertyResult.value}]`)
			}

			return ok(`${objectResult.value}.${propertyResult.value}`)
		},

		ObjectExpression: function serializeObjectExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const properties = (n.properties as ReadonlyArray<
				Record<string, unknown>
			>) ?? []

			// Helper to accumulate object properties with error propagation
			function accumulateProperties(
				accResult: Result<ConstantExtractionError, ReadonlyArray<string>>,
				property: Record<string, unknown>,
			): Result<ConstantExtractionError, ReadonlyArray<string>> {
				if (accResult._tag === "Error") {
					return accResult
				}

				const propResult = _serializeObjectProperty(property)

				if (propResult._tag === "Error") {
					return propResult
				}

				// Skip empty strings (non-KeyValueProperty nodes)
				if (propResult.value === "") {
					return accResult
				}

				return ok([...accResult.value, propResult.value])
			}

			const propsResult = reduce(accumulateProperties)(
				ok([] as ReadonlyArray<string>),
			)(properties)

			if (propsResult._tag === "Error") {
				return propsResult
			}

			return ok(`{ ${propsResult.value.join(", ")} }`)
		},

		ArrayExpression: function serializeArrayExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const elements = (n.elements as ReadonlyArray<
				Record<string, unknown> | null
			>) ?? []

			// Helper to accumulate array elements with error propagation
			function accumulateElements(
				accResult: Result<ConstantExtractionError, ReadonlyArray<string>>,
				element: Record<string, unknown> | null,
			): Result<ConstantExtractionError, ReadonlyArray<string>> {
				if (accResult._tag === "Error") {
					return accResult
				}

				const elemResult = _serializeArrayElement(element)

				if (elemResult._tag === "Error") {
					return elemResult
				}

				// Skip empty strings (null elements)
				if (elemResult.value === "") {
					return accResult
				}

				return ok([...accResult.value, elemResult.value])
			}

			const elemsResult = reduce(accumulateElements)(
				ok([] as ReadonlyArray<string>),
			)(elements)

			if (elemsResult._tag === "Error") {
				return elemsResult
			}

			return ok(`[${elemsResult.value.join(", ")}]`)
		},

		CallExpression: function serializeCallExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const calleeResult = _serializeExpression(n.callee)

			if (calleeResult._tag === "Error") {
				return calleeResult
			}

			const args = (n.arguments as ReadonlyArray<
				Record<string, unknown>
			>) ?? []

			// Helper to accumulate call arguments with error propagation
			function accumulateArguments(
				accResult: Result<ConstantExtractionError, ReadonlyArray<string>>,
				argument: Record<string, unknown>,
			): Result<ConstantExtractionError, ReadonlyArray<string>> {
				if (accResult._tag === "Error") {
					return accResult
				}

				const argResult = _serializeCallArgument(argument)

				if (argResult._tag === "Error") {
					return argResult
				}

				return ok([...accResult.value, argResult.value])
			}

			const argsResult = reduce(accumulateArguments)(
				ok([] as ReadonlyArray<string>),
			)(args)

			if (argsResult._tag === "Error") {
				return argsResult
			}

			return ok(`${calleeResult.value}(${argsResult.value.join(", ")})`)
		},

		ConditionalExpression: function serializeConditionalExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const testResult = _serializeExpression(n.test)

			if (testResult._tag === "Error") {
				return testResult
			}

			const consequentResult = _serializeExpression(n.consequent)

			if (consequentResult._tag === "Error") {
				return consequentResult
			}

			const alternateResult = _serializeExpression(n.alternate)

			if (alternateResult._tag === "Error") {
				return alternateResult
			}

			return ok(
				`${testResult.value} ? ${consequentResult.value} : ${alternateResult.value}`,
			)
		},

		ArrowFunctionExpression: function serializeArrowFunctionExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const params = (n.params as ReadonlyArray<
				Record<string, unknown>
			>) ?? []

			// Helper to accumulate parameters with error propagation
			function accumulateParams(
				accResult: Result<ConstantExtractionError, ReadonlyArray<string>>,
				param: Record<string, unknown>,
			): Result<ConstantExtractionError, ReadonlyArray<string>> {
				if (accResult._tag === "Error") {
					return accResult
				}

				const paramResult = _serializePattern(param)

				if (paramResult._tag === "Error") {
					return paramResult
				}

				return ok([...accResult.value, paramResult.value])
			}

			const paramsResult = reduce(accumulateParams)(
				ok([] as ReadonlyArray<string>),
			)(params)

			if (paramsResult._tag === "Error") {
				return paramsResult
			}

			return ok(`(${paramsResult.value.join(", ")}) => ...`)
		},

		FunctionExpression: function serializeFunctionExpression(
			n: Record<string, unknown>,
		): Result<ConstantExtractionError, string> {
			const params = (n.params as ReadonlyArray<
				Record<string, unknown>
			>) ?? []

			// Helper to accumulate parameters with error propagation
			function accumulateParams(
				accResult: Result<ConstantExtractionError, ReadonlyArray<string>>,
				param: Record<string, unknown>,
			): Result<ConstantExtractionError, ReadonlyArray<string>> {
				if (accResult._tag === "Error") {
					return accResult
				}

				const paramResult = _serializePattern(param)

				if (paramResult._tag === "Error") {
					return paramResult
				}

				return ok([...accResult.value, paramResult.value])
			}

			const paramsResult = reduce(accumulateParams)(
				ok([] as ReadonlyArray<string>),
			)(params)

			if (paramsResult._tag === "Error") {
				return paramsResult
			}

			return ok(`function(${paramsResult.value.join(", ")}) { ... }`)
		},
	}

	const serializer = serializers[nodeType]

	if (!serializer) {
		return makeConstantError(
			"UnsupportedExpressionType",
			`Unsupported expression type: ${nodeType}`,
		)
	}

	return serializer(nodeObj)
}
