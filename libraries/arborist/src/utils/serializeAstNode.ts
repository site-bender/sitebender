// @sitebender/arborist/src/utils/serializeAstNode
// Utilities for serializing SWC AST nodes to string representation
// This avoids the SWC WASM span offset accumulation bug that makes
// substring extraction unreliable across multiple parse() calls

//++ Serialize an AST expression node to its string representation
//++ Handles literals, objects, arrays, function calls, and complex expressions
//++ Returns undefined if the node cannot be serialized
export function serializeExpression(node: unknown): string | undefined {
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
			if (nodeObj.value === "undefined") {
				return "undefined"
			}
			return nodeObj.value as string

		// Template literals
		case "TemplateLiteral": {
			const quasis = nodeObj.quasis as Array<Record<string, unknown>>
			const expressions = nodeObj.expressions as Array<unknown>
			let result = "`"
			for (let i = 0; i < quasis.length; i++) {
				const quasi = quasis[i]
				const cooked = (quasi.cooked as string) ?? ""
				result += cooked
				if (i < expressions.length) {
					result += "${" + (serializeExpression(expressions[i]) ?? "") + "}"
				}
			}
			result += "`"
			return result
		}

		// Object literals
		case "ObjectExpression": {
			const properties = nodeObj.properties as Array<Record<string, unknown>>
			const serializedProps = properties.map((prop) => {
				const propType = prop.type as string
				if (propType === "KeyValueProperty") {
					const key = serializeExpression(prop.key)
					const value = serializeExpression(prop.value)
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
					return serializeExpression(elem.expression)
				}
				return serializeExpression(elem)
			}).filter(Boolean)
			return `[${serializedElements.join(", ")}]`
		}

		// Binary expressions (e.g., 10 * 20)
		case "BinaryExpression": {
			const left = serializeExpression(nodeObj.left)
			const right = serializeExpression(nodeObj.right)
			const operator = nodeObj.operator as string
			return `${left} ${operator} ${right}`
		}

		// Unary expressions (e.g., -5, !true)
		case "UnaryExpression": {
			const argument = serializeExpression(nodeObj.argument)
			const operator = nodeObj.operator as string
			return `${operator}${argument}`
		}

		// Call expressions (e.g., doSomething())
		case "CallExpression": {
			const callee = serializeExpression(nodeObj.callee)
			const args = nodeObj.arguments as Array<Record<string, unknown>>
			const serializedArgs = args.map((arg) => {
				if (arg.expression) {
					return serializeExpression(arg.expression)
				}
				return serializeExpression(arg)
			})
			return `${callee}(${serializedArgs.join(", ")})`
		}

		// Member expressions (e.g., obj.prop)
		case "MemberExpression": {
			const object = serializeExpression(nodeObj.object)
			const property = serializeExpression(nodeObj.property)
			const computed = nodeObj.computed as boolean
			if (computed) {
				return `${object}[${property}]`
			}
			return `${object}.${property}`
		}

		// Arrow functions
		case "ArrowFunctionExpression": {
			const params = nodeObj.params as Array<Record<string, unknown>>
			const serializedParams = params.map((param) => serializePattern(param))
				.join(", ")
			return `(${serializedParams}) => ...`
		}

		// Function expressions
		case "FunctionExpression": {
			const params = nodeObj.params as Array<Record<string, unknown>>
			const serializedParams = params.map((param) => serializePattern(param))
				.join(", ")
			return `function(${serializedParams}) { ... }`
		}

		// Conditional expressions (ternary)
		case "ConditionalExpression": {
			const test = serializeExpression(nodeObj.test)
			const consequent = serializeExpression(nodeObj.consequent)
			const alternate = serializeExpression(nodeObj.alternate)
			return `${test} ? ${consequent} : ${alternate}`
		}

		default:
			// For unsupported node types, return a placeholder
			return `<${nodeType}>`
	}
}

//++ Serialize a pattern node (used in function parameters, destructuring)
function serializePattern(node: unknown): string {
	if (!node) {
		return ""
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	switch (nodeType) {
		case "Identifier":
			return nodeObj.value as string
		case "RestElement": {
			const argument = serializePattern(nodeObj.argument)
			return `...${argument}`
		}
		case "ArrayPattern": {
			const elements = nodeObj.elements as Array<unknown>
			const serialized = elements.map(serializePattern).join(", ")
			return `[${serialized}]`
		}
		case "ObjectPattern": {
			const properties = nodeObj.properties as Array<Record<string, unknown>>
			const serialized = properties.map((prop) => {
				if (prop.type === "KeyValuePatternProperty") {
					const key = serializePattern(prop.key)
					const value = serializePattern(prop.value)
					return `${key}: ${value}`
				}
				return ""
			}).filter(Boolean).join(", ")
			return `{ ${serialized} }`
		}
		default:
			return `<${nodeType}>`
	}
}

//++ Serialize a TypeScript type annotation to string
//++ Handles primitive types, object types, union types, generics, etc.
export function serializeTypeAnnotation(node: unknown): string {
	if (!node) {
		return "unknown"
	}

	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	switch (nodeType) {
		// Keyword types (string, number, boolean, etc.)
		case "TsKeywordType": {
			const kind = nodeObj.kind as string
			return kind
		}

		// Type references (e.g., Array<T>, MyType)
		case "TsTypeReference": {
			const typeName = nodeObj.typeName as Record<string, unknown>
			const name = typeName.value as string
			const typeParams = nodeObj.typeParams as
				| Record<string, unknown>
				| undefined
			if (typeParams) {
				const params = typeParams.params as Array<unknown>
				const serializedParams = params.map(serializeTypeAnnotation).join(
					", ",
				)
				return `${name}<${serializedParams}>`
			}
			return name
		}

		// Union types (A | B | C)
		case "TsUnionType": {
			const types = nodeObj.types as Array<unknown>
			const serialized = types.map(serializeTypeAnnotation).join(" | ")
			return serialized
		}

		// Intersection types (A & B & C)
		case "TsIntersectionType": {
			const types = nodeObj.types as Array<unknown>
			const serialized = types.map(serializeTypeAnnotation).join(" & ")
			return serialized
		}

		// Array types (T[])
		case "TsArrayType": {
			const elemType = serializeTypeAnnotation(nodeObj.elemType)
			return `${elemType}[]`
		}

		// Tuple types ([string, number])
		case "TsTupleType": {
			const elemTypes = nodeObj.elemTypes as Array<Record<string, unknown>>
			const serialized = elemTypes.map((elem) =>
				serializeTypeAnnotation(elem.ty)
			).join(", ")
			return `[${serialized}]`
		}

		// Object types ({ key: value })
		case "TsTypeLiteral": {
			const members = nodeObj.members as Array<Record<string, unknown>>
			const serialized = members.map((member) => {
				const memberType = member.type as string
				if (memberType === "TsPropertySignature") {
					const key = member.key as Record<string, unknown>
					const keyName = key.value as string
					const typeAnn = member.typeAnnotation as
						| Record<string, unknown>
						| undefined
					if (typeAnn) {
						const type = serializeTypeAnnotation(
							typeAnn.typeAnnotation,
						)
						const optional = member.optional as boolean
						return `${keyName}${optional ? "?" : ""}: ${type}`
					}
					return keyName
				}
				return ""
			}).filter(Boolean).join("; ")
			return `{ ${serialized} }`
		}

		// Function types ((arg: T) => R)
		case "TsFunctionType": {
			const params = nodeObj.params as Array<Record<string, unknown>>
			const serializedParams = params.map((param) => {
				const pat = param.pat as Record<string, unknown>
				const name = pat.value as string
				const typeAnn = param.typeAnnotation as
					| Record<string, unknown>
					| undefined
				if (typeAnn) {
					const type = serializeTypeAnnotation(typeAnn.typeAnnotation)
					return `${name}: ${type}`
				}
				return name
			}).join(", ")
			const returnType = serializeTypeAnnotation(
				nodeObj.typeAnnotation,
			)
			return `(${serializedParams}) => ${returnType}`
		}

		// Literal types ("literal", 42, true)
		case "TsLiteralType": {
			const literal = nodeObj.literal as Record<string, unknown>
			const litType = literal.type as string
			if (litType === "StringLiteral") {
				return `"${literal.value}"`
			}
			if (litType === "NumericLiteral") {
				return String(literal.value)
			}
			if (litType === "BooleanLiteral") {
				return String(literal.value)
			}
			return "unknown"
		}

		// Conditional types (T extends U ? X : Y)
		case "TsConditionalType": {
			const checkType = serializeTypeAnnotation(nodeObj.checkType)
			const extendsType = serializeTypeAnnotation(nodeObj.extendsType)
			const trueType = serializeTypeAnnotation(nodeObj.trueType)
			const falseType = serializeTypeAnnotation(nodeObj.falseType)
			return `${checkType} extends ${extendsType} ? ${trueType} : ${falseType}`
		}

		// Mapped types ({ [K in keyof T]: U })
		case "TsMappedType": {
			const typeParam = nodeObj.typeParam as Record<string, unknown>
			const name = (typeParam.name as Record<string, unknown>).value as string
			const constraint = typeParam.constraint
				? serializeTypeAnnotation(typeParam.constraint)
				: "unknown"
			const typeAnn = nodeObj.typeAnnotation
				? serializeTypeAnnotation(nodeObj.typeAnnotation)
				: "unknown"
			return `{ [${name} in ${constraint}]: ${typeAnn} }`
		}

		// Indexed access types (T[K])
		case "TsIndexedAccessType": {
			const objType = serializeTypeAnnotation(nodeObj.objectType)
			const indexType = serializeTypeAnnotation(nodeObj.indexType)
			return `${objType}[${indexType}]`
		}

		// Type queries (typeof x)
		case "TsTypeQuery": {
			const exprName = nodeObj.exprName as Record<string, unknown>
			const name = exprName.value as string
			return `typeof ${name}`
		}

		// Parenthesized types ((T))
		case "TsParenthesizedType": {
			const typeAnn = serializeTypeAnnotation(nodeObj.typeAnnotation)
			return `(${typeAnn})`
		}

		// Optional types (T?)
		case "TsOptionalType": {
			const typeAnn = serializeTypeAnnotation(nodeObj.typeAnnotation)
			return `${typeAnn}?`
		}

		// Rest types (...T[])
		case "TsRestType": {
			const typeAnn = serializeTypeAnnotation(nodeObj.typeAnnotation)
			return `...${typeAnn}`
		}

		default:
			return "unknown"
	}
}
