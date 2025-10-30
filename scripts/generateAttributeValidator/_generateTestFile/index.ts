import type { AttributeConfig } from "../types/index.ts"

/*++
 + Generates test file content for validator
 + Returns array of test code lines
 */
export default function _generateTestFile(
	config: Readonly<AttributeConfig>,
): ReadonlyArray<string> {
	const functionName = `_validate${
		config.attributeName.charAt(0).toUpperCase()
	}${config.attributeName.slice(1)}`
	const attrName = config.attributeName

	const baseTests = [
		'import { assertEquals } from "@std/assert"',
		"",
		`import ${functionName} from "./index.ts"`,
		"",
		`Deno.test("${functionName}", async function ${functionName}Tests(t) {`,
		"\tawait t.step(",
		`\t\t"returns empty object when ${attrName} absent",`,
		"\t\tfunction returnsEmptyWhenAbsent() {",
		`\t\t\tconst result = ${functionName}({})`,
		"",
		"\t\t\tassertEquals(result, {})",
		"\t\t},",
		"\t)",
		"",
	]

	if (config.validationType === "enum" && config.validValues) {
		const firstValue = config.validValues[0]
		return [
			...baseTests,
			`\tawait t.step("returns valid ${attrName} value", function returnsValidValue() {`,
			`\t\tconst result = ${functionName}({ ${attrName}: "${firstValue}" })`,
			"",
			`\t\tassertEquals(result, { ${attrName}: "${firstValue}" })`,
			"\t})",
			"",
			'\tawait t.step("validates all valid values", function validatesAllValues() {',
			`\t\tconst validValues = [${
				config.validValues.map((v) => `"${v}"`).join(", ")
			}]`,
			"",
			"\t\tvalidValues.forEach((value) => {",
			`\t\t\tconst result = ${functionName}({ ${attrName}: value })`,
			`\t\t\tassertEquals(result, { ${attrName}: value })`,
			"\t\t})",
			"\t})",
			"",
			"\tawait t.step(",
			'\t\t"returns empty object for invalid value",',
			"\t\tfunction returnsEmptyForInvalid() {",
			`\t\t\tconst result = ${functionName}({ ${attrName}: "invalid" })`,
			"",
			"\t\t\tassertEquals(result, {})",
			"\t\t},",
			"\t)",
			"",
			"\tawait t.step(",
			'\t\t"returns empty object for non-string value",',
			"\t\tfunction returnsEmptyForNonString() {",
			`\t\t\tconst result = ${functionName}({ ${attrName}: true })`,
			"",
			"\t\t\tassertEquals(result, {})",
			"\t\t},",
			"\t)",
			"})",
		]
	}

	if (config.validationType === "boolean") {
		const trueValue = config.converter === "_convertBooleanToYesNo"
			? "yes"
			: "true"
		const falseValue = config.converter === "_convertBooleanToYesNo"
			? "no"
			: "false"

		return [
			...baseTests,
			`\tawait t.step("converts boolean true to ${trueValue}", function convertsTrue() {`,
			`\t\tconst result = ${functionName}({ ${attrName}: true })`,
			"",
			`\t\tassertEquals(result, { ${attrName}: "${trueValue}" })`,
			"\t})",
			"",
			`\tawait t.step("converts boolean false to ${falseValue}", function convertsFalse() {`,
			`\t\tconst result = ${functionName}({ ${attrName}: false })`,
			"",
			`\t\tassertEquals(result, { ${attrName}: "${falseValue}" })`,
			"\t})",
			"",
			`\tawait t.step("accepts string ${trueValue}", function acceptsStringTrue() {`,
			`\t\tconst result = ${functionName}({ ${attrName}: "${trueValue}" })`,
			"",
			`\t\tassertEquals(result, { ${attrName}: "${trueValue}" })`,
			"\t})",
			"",
			`\tawait t.step("accepts string ${falseValue}", function acceptsStringFalse() {`,
			`\t\tconst result = ${functionName}({ ${attrName}: "${falseValue}" })`,
			"",
			`\t\tassertEquals(result, { ${attrName}: "${falseValue}" })`,
			"\t})",
			"",
			"\tawait t.step(",
			'\t\t"returns empty object for invalid string",',
			"\t\tfunction returnsEmptyForInvalidString() {",
			`\t\t\tconst result = ${functionName}({ ${attrName}: "invalid" })`,
			"",
			"\t\t\tassertEquals(result, {})",
			"\t\t},",
			"\t)",
			"})",
		]
	}

	return [
		...baseTests,
		`\tawait t.step("returns valid ${attrName} value", function returnsValidValue() {`,
		`\t\tconst result = ${functionName}({ ${attrName}: "test-value" })`,
		"",
		`\t\tassertEquals(result, { ${attrName}: "test-value" })`,
		"\t})",
		"",
		"\tawait t.step(",
		'\t\t"returns empty object for non-string value",',
		"\t\tfunction returnsEmptyForNonString() {",
		`\t\t\tconst result = ${functionName}({ ${attrName}: 123 })`,
		"",
		"\t\t\tassertEquals(result, {})",
		"\t\t},",
		"\t)",
		"})",
	]
}
