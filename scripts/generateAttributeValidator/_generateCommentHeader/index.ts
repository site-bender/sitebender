import type { AttributeConfig } from "../types/index.ts"

/*++
 + Generates JSDoc-style comment header for validator
 + Returns array of comment lines
 */
export default function _generateCommentHeader(
	config: Readonly<AttributeConfig>,
): ReadonlyArray<string> {
	const attrName = config.attributeName
	const description = config.description ??
		`Validates ${attrName} global attribute`

	const lines = [
		"/*++",
		` + ${description}`,
	]

	if (config.validationType === "enum" && config.validValues) {
		const values = config.validValues.join('" | "')
		lines.push(` + Valid values: "${values}"`)
	} else if (config.validationType === "boolean") {
		const values = config.converter === "_convertBooleanToYesNo"
			? '"yes" | "no"'
			: '"true" | "false"'
		lines.push(
			` + Accepts boolean (converted to ${values}) or string ${values}`,
		)
	} else if (config.validationType === "number") {
		lines.push(" + Accepts number or numeric string")
	} else if (config.validationType === "pattern") {
		lines.push(` + Pattern: ${config.pattern}`)
	} else {
		lines.push(" + Accepts any string value")
	}

	lines.push(
		` + Returns { ${attrName}: value } if valid, {} if absent or invalid`,
	)
	lines.push(" */")

	return lines
}
