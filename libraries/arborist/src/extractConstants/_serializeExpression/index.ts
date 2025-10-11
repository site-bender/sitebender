import _serializePattern from "../../_serializePattern/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

//++ Serialize an AST expression node to its string representation
//++ Handles literals, objects, arrays, function calls, and complex expressions
//++ Returns undefined if the node cannot be serialized
export default function _serializeExpression(node: unknown): string | undefined {
	if (!node) {
		return undefined
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	switch (nodeType) {
		// Literals
		case "NumericLiteral":
			return String(nodeObj.value)
		case "StringLiteral":
			return `"${nodeObj.value}"`
		case "BooleanLiteral":
			return String(nodeObj.value)
		case "NullLiteral":
			return "null"
		case "Identifier":
			if (isEqual(nodeObj.value)("undefined")) {
				return "undefined"
			}
			return nodeObj.value as string

		// Template literals
		case "TemplateLiteral": {
			const quasis = nodeObj.quasis as Array<Record<string, unknown>>
			const expressions = nodeObj.expressions as Array<unknown>
			const result = quasis.reduce((acc: string, quasi: Record<string, unknown>, i: number) => {
				const cooked = (quasi.cooked as string) ?? ""
				acc += cooked
				if (i < getOrElse(0)(length(expressions))) {
					acc += "${" + (_serializeExpression(expressions[i]) ?? "") + "}"
				}
				return acc
			}, "`") + "`"
			return result
		}

		// Object literals
		case "ObjectExpression": {
			const properties = nodeObj.properties as Array<Record<string, unknown>>
			const serializedProps = properties.map((prop) => {
				const propType = prop.type as string
				if (isEqual(propType)("KeyValueProperty")) {
					const key = _serializeExpression(prop.key)
					const value = _serializeExpression(prop.value)
					return `${key}: ${value}`
				}
				return ""
			}).filter(Boolean)
			return `{ ${serializedProps.join(", ")} }`
		}

		// Array literals
		case "ArrayExpression": {
			const elements = nodeObj.elements as Array<
				Record<string, unknown> | null
			>
			const serializedElements = elements.map((elem) => {
				if (!elem) {
					return ""
				}
				// Handle ExpressionStatement wrapper
				if (elem.expression) {
					return _serializeExpression(elem.expression)
				}
				return _serializeExpression(elem)
			}).filter(Boolean)
			return `[${serializedElements.join(", ")}]`
		}

		// Binary expressions (e.g., 10 * 20)
		case "BinaryExpression": {
			const left = _serializeExpression(nodeObj.left)
			const right = _serializeExpression(nodeObj.right)
			const operator = nodeObj.operator as string
			return `${left} ${operator} ${right}`
		}

		// Unary expressions (e.g., -5, !true)
		case "UnaryExpression": {
			const argument = _serializeExpression(nodeObj.argument)
			const operator = nodeObj.operator as string
			return `${operator}${argument}`
		}

		// Call expressions (e.g., doSomething())
		case "CallExpression": {
			const callee = _serializeExpression(nodeObj.callee)
			const args = nodeObj.arguments as Array<Record<string, unknown>>
			const serializedArgs = args.map((arg) => {
				if (arg.expression) {
					return _serializeExpression(arg.expression)
				}
				return _serializeExpression(arg)
			})
			return `${callee}(${serializedArgs.join(", ")})`
		}

		// Member expressions (e.g., obj.prop)
		case "MemberExpression": {
			const object = _serializeExpression(nodeObj.object)
			const property = _serializeExpression(nodeObj.property)
			const computed = nodeObj.computed as boolean
			if (computed) {
				return `${object}[${property}]`
			}
			return `${object}.${property}`
		}

		// Arrow functions
		case "ArrowFunctionExpression": {
			const params = nodeObj.params as Array<Record<string, unknown>>
			const serializedParams = params.map((param) => _serializePattern(param))
				.join(", ")
			return `(${serializedParams}) => ...`
		}

		// Function expressions
		case "FunctionExpression": {
			const params = nodeObj.params as Array<Record<string, unknown>>
			const serializedParams = params.map((param) => _serializePattern(param))
				.join(", ")
			return `function(${serializedParams}) { ... }`
		}

		// Conditional expressions (ternary)
		case "ConditionalExpression": {
			const test = _serializeExpression(nodeObj.test)
			const consequent = _serializeExpression(nodeObj.consequent)
			const alternate = _serializeExpression(nodeObj.alternate)
			return `${test} ? ${consequent} : ${alternate}`
		}

		default:
			// For unsupported node types, return a placeholder
			return `<${nodeType}>`
	}
}
