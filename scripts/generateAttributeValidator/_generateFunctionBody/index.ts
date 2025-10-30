import type { AttributeConfig } from "../types/index.ts"

/*++
 + Generates function body for validator based on validation type
 + Returns array of code lines
 */
export default function _generateFunctionBody(
	config: Readonly<AttributeConfig>,
): ReadonlyArray<string> {
	const functionName = `_validate${
		config.attributeName.charAt(0).toUpperCase()
	}${config.attributeName.slice(1)}`
	const attrName = config.attributeName

	const header = [
		`export default function ${functionName}(`,
		"\tprops: Readonly<Record<string, unknown>>,",
		"): Readonly<Record<string, string>> {",
		`\tif (not("${attrName}" in props)) {`,
		"\t\treturn {}",
		"\t}",
		"",
		`\tconst value = props.${attrName}`,
	]

	if (config.validationType === "enum") {
		const valuesArray = `["${config.validValues?.join('", "') ?? ""}"]`
		return [
			...header,
			`\tconst validValues = ${valuesArray} as const`,
			"",
			"\tif (and(isString(value))(includes(validValues)(value))) {",
			`\t\treturn { ${attrName}: value as string }`,
			"\t}",
			"",
			"\treturn {}",
			"}",
		]
	}

	if (config.validationType === "boolean") {
		const convertedValues = config.converter === "_convertBooleanToYesNo"
			? '["yes", "no"]'
			: '["true", "false"]'

		return [
			...header,
			"",
			"\tif (or(isBoolean(value))(isString(value))) {",
			`\t\tconst converted = ${config.converter}(value)`,
			"",
			`\t\tif (converted && includes(${convertedValues})(converted)) {`,
			`\t\t\treturn { ${attrName}: converted }`,
			"\t\t}",
			"\t}",
			"",
			"\treturn {}",
			"}",
		]
	}

	if (config.validationType === "number") {
		return [
			...header,
			"",
			"\tif (or(isNumber(value))(isString(value))) {",
			"\t\tconst stringValue = String(value)",
			"",
			"\t\tif (stringValue && stringValue.length > 0) {",
			`\t\t\treturn { ${attrName}: stringValue }`,
			"\t\t}",
			"\t}",
			"",
			"\treturn {}",
			"}",
		]
	}

	if (config.validationType === "pattern") {
		return [
			...header,
			"",
			"\tif (isString(value)) {",
			`\t\tconst pattern = ${config.pattern}`,
			"\t\tconst regex = new RegExp(pattern)",
			"",
			"\t\tif (regex.test(value)) {",
			`\t\t\treturn { ${attrName}: value as string }`,
			"\t\t}",
			"\t}",
			"",
			"\treturn {}",
			"}",
		]
	}

	return [
		...header,
		"",
		"\tif (isString(value)) {",
		`\t\treturn { ${attrName}: value as string }`,
		"\t}",
		"",
		"\treturn {}",
		"}",
	]
}
