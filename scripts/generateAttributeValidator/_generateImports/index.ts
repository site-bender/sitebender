import type { AttributeConfig } from "../types/index.ts"

/*++
 + Generates import statements for validator based on validation type
 + Returns array of import lines
 */
export default function _generateImports(
	config: Readonly<AttributeConfig>,
): ReadonlyArray<string> {
	const baseImports = [
		'import isString from "@sitebender/toolsmith/predicates/isString/index.ts"',
		'import not from "@sitebender/toolsmith/logic/not/index.ts"',
	]

	if (config.validationType === "enum") {
		return [
			...baseImports,
			'import includes from "@sitebender/toolsmith/array/includes/index.ts"',
			'import and from "@sitebender/toolsmith/logic/and/index.ts"',
		]
	}

	if (config.validationType === "boolean") {
		return [
			...baseImports,
			'import includes from "@sitebender/toolsmith/array/includes/index.ts"',
			'import or from "@sitebender/toolsmith/logic/or/index.ts"',
			'import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"',
			"",
			`import ${config.converter} from "../${config.converter}/index.ts"`,
		]
	}

	if (config.validationType === "number") {
		return [
			'import isNumber from "@sitebender/toolsmith/predicates/isNumber/index.ts"',
			'import isString from "@sitebender/toolsmith/predicates/isString/index.ts"',
			'import not from "@sitebender/toolsmith/logic/not/index.ts"',
			'import or from "@sitebender/toolsmith/logic/or/index.ts"',
		]
	}

	if (config.validationType === "pattern") {
		return [
			...baseImports,
		]
	}

	return baseImports
}
