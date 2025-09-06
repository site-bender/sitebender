import type { FunctionMetadata } from "../../types/index.ts"
import { TEMPLATES } from "../../constants/index.ts"
import formatProperties from "../formatProperties/index.ts"
import { extractSignature } from "../../extractors/index.ts"

/**
 * Generates markdown documentation from function metadata
 */
export default function generateMarkdown(metadata: FunctionMetadata): string {
	const template = TEMPLATES.markdown
	let output = ""

	// Add header with name and description
	output += template.header
		.replace("{name}", metadata.signature.name)
		.replace(
			"{description}",
			metadata.description || "No description provided",
		)

	// Add properties badges
	const badges = formatProperties(metadata.properties)
	if (badges && badges !== "None detected") {
		output += template.properties.replace("{badges}", badges)
	}

	// Add signature
	const signature = extractSignature(metadata.signature)
	output += template.signature.replace("{signature}", signature)

	// Add examples if available
	if (metadata.examples && metadata.examples.length > 0) {
		const exampleCode = metadata.examples
			.map((ex) => {
				let code = ex.code
				if (ex.result) {
					code += ` // ${ex.result}`
				}
				return code
			})
			.join("\n")

		if (exampleCode) {
			output += template.examples.replace("{examples}", exampleCode)
		}
	}

	// Add mathematical laws if available
	if (metadata.laws && metadata.laws.length > 0) {
		const lawsList = metadata.laws
			.map((law) => `- ${law.name}: \`${law.formula}\``)
			.join("\n")

		if (lawsList) {
			output += template.laws.replace("{laws}", lawsList)
		}
	}

	// Add complexity
	output += template.complexity.replace(
		"{complexity}",
		metadata.properties.complexity,
	)

	// Add related functions if available
	if (metadata.relatedFunctions && metadata.relatedFunctions.length > 0) {
		const related = metadata.relatedFunctions.join(", ")
		output += template.related.replace("{related}", related)
	}

	return output
}
