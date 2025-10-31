//++ Generator for error types and constructors
//++ Creates discriminated unions, type guards, and error helpers

import type { ErrorTypeConfig, ErrorVariant, ErrorField } from "./types.ts"

//++ Generates complete error type module
export default function generateErrorType(config: ErrorTypeConfig): string {
	const { name, variants, baseType, description } = config

	const typeDefinition = _generateTypeDefinition(name)(variants)(baseType)
	const typeGuards = _generateTypeGuards(name)(variants)
	const constructors = _generateConstructors(variants)
	const examples = _generateExamples(name)(variants)

	return `//++ ${description || `${name} error type`}
//++ Generated discriminated union with type guards and constructors

${typeDefinition}

${typeGuards}

${constructors}

${examples}
`
}

//++ Generates discriminated union type definition
function _generateTypeDefinition(name: string) {
	return function generateTypeDefinitionForName(
		variants: ReadonlyArray<ErrorVariant>,
	) {
		return function generateTypeDefinitionForNameAndVariants(
			baseType?: string,
		): string {
			const variantTypes = variants
				.map((variant) => _generateVariantType(variant))
				.join("\n\n")

			const unionType = variants.map((v) => v.tag).join(" | ")

			const extendsClause = baseType ? ` | ${baseType}` : ""

			return `${variantTypes}

export type ${name} = ${unionType}${extendsClause}
`
		}
	}
}

//++ Generates single variant type
function _generateVariantType(variant: ErrorVariant): string {
	const { tag, description, fields } = variant

	const fieldDefinitions = fields
		.map((field) => `\treadonly ${field.name}: ${field.type}`)
		.join("\n")

	return `//++ ${description}
export type ${tag} = {
\treadonly _tag: "${tag}"
${fieldDefinitions}
}`
}

//++ Generates type guards for all variants
function _generateTypeGuards(name: string) {
	return function generateTypeGuardsForName(
		variants: ReadonlyArray<ErrorVariant>,
	): string {
		const guards = variants
			.map((variant) => _generateTypeGuard(name)(variant))
			.join("\n\n")

		return `//++ Type guards for ${name} variants\n\n${guards}`
	}
}

//++ Generates single type guard
function _generateTypeGuard(name: string) {
	return function generateTypeGuardForName(variant: ErrorVariant): string {
		const { tag } = variant
		const guardName = `is${tag}`

		return `//++ Type guard for ${tag}
export default function ${guardName}(value: unknown): value is ${tag} {
\treturn (
\t\ttypeof value === "object" &&
\t\tvalue !== null &&
\t\t"_tag" in value &&
\t\tvalue._tag === "${tag}"
\t)
}`
	}
}

//++ Generates constructor functions for variants
function _generateConstructors(
	variants: ReadonlyArray<ErrorVariant>,
): string {
	const constructors = variants
		.map((variant) => _generateConstructor(variant))
		.join("\n\n")

	return `//++ Constructor functions\n\n${constructors}`
}

//++ Generates single constructor function
function _generateConstructor(variant: ErrorVariant): string {
	const { tag, description, fields } = variant

	if (fields.length === 0) {
		return `//++ Creates ${tag} error
export function create${tag}(): ${tag} {
\treturn { _tag: "${tag}" }
}`
	}

	if (fields.length === 1) {
		const field = fields[0]
		return `//++ Creates ${tag} error
export function create${tag}(${field.name}: ${field.type}): ${tag} {
\treturn {
\t\t_tag: "${tag}",
\t\t${field.name},
\t}
}`
	}

	// Multiple fields - curry the constructor
	const [firstField, ...restFields] = fields

	const innerFunctions = restFields.map((field, index) => {
		const capturedFields = [firstField, ...restFields.slice(0, index + 1)]
		const functionName = `create${tag}With${_capitalize(capturedFields.map((f) => _capitalize(f.name)).join("And"))}`
		const remainingFields = restFields.slice(index + 1)

		if (remainingFields.length === 0) {
			// Last function - returns the object
			const allFields = [...capturedFields, field]
			return `\t\treturn function ${functionName}(${field.name}: ${field.type}): ${tag} {
\t\t\treturn {
\t\t\t\t_tag: "${tag}",
${allFields.map((f) => `\t\t\t\t${f.name},`).join("\n")}
\t\t\t}
\t\t}`
		} else {
			// Middle function - returns another function
			return `\t\treturn function ${functionName}(${field.name}: ${field.type}) {`
		}
	})

	return `//++ Creates ${tag} error (curried)
export function create${tag}(${firstField.name}: ${firstField.type}) {
${innerFunctions.join("\n")}
${"\t".repeat(restFields.length)}}
${"}\n".repeat(restFields.length - 1)}`
}

//++ Generates usage examples
function _generateExamples(name: string) {
	return function generateExamplesForName(
		variants: ReadonlyArray<ErrorVariant>,
	): string {
		const examples = variants
			.map((variant) => _generateExample(variant))
			.join("\n\n")

		return `//++ Usage examples:\n\n${examples}`
	}
}

//++ Generates single usage example
function _generateExample(variant: ErrorVariant): string {
	const { tag, fields } = variant

	if (fields.length === 0) {
		return `//++ Create ${tag}
const error1 = create${tag}()
// error1 = { _tag: "${tag}" }`
	}

	if (fields.length === 1) {
		const field = fields[0]
		const exampleValue = _getExampleValue(field.type)
		return `//++ Create ${tag}
const error1 = create${tag}(${exampleValue})
// error1 = { _tag: "${tag}", ${field.name}: ${exampleValue} }`
	}

	// Multiple fields - show curried usage
	const exampleValues = fields.map((f) => _getExampleValue(f.type))
	return `//++ Create ${tag} (curried)
const error1 = create${tag}(${exampleValues.join(")(")})
// error1 = { _tag: "${tag}", ${fields.map((f, i) => `${f.name}: ${exampleValues[i]}`).join(", ")} }`
}

//++ Helper: Capitalize first letter
function _capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

//++ Helper: Get example value for type
function _getExampleValue(type: string): string {
	if (type === "string") return '"example"'
	if (type === "number") return "42"
	if (type === "boolean") return "true"
	if (type.startsWith("Array<") || type.startsWith("ReadonlyArray<"))
		return "[]"
	return "/* value */"
}
