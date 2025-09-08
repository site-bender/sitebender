import type { FunctionMetadata } from "../../types/index.ts"
import { TEMPLATES } from "../../constants/index.ts"
import formatProperties from "../formatProperties/index.ts"
import { extractSignature } from "../../extractors/index.ts"

/**
 * Generates markdown documentation from function metadata
 */
export default function generateMarkdown(metadata: FunctionMetadata): string {
	const template = TEMPLATES.markdown
	const header = template.header
		.replace("{name}", metadata.signature.name)
		.replace(
			"{description}",
			metadata.description || "No description provided",
		)

	const badges = formatProperties(metadata.properties)
	const propertiesSection = (badges && badges !== "None detected")
		? template.properties.replace("{badges}", badges)
		: ""

	const signatureSection = template.signature.replace(
		"{signature}",
		extractSignature(metadata.signature),
	)

	const examplesSection = (metadata.examples && metadata.examples.length > 0)
		? (() => {
			const exampleCode = metadata.examples
				.map((ex) => ex.result ? `${ex.code} // ${ex.result}` : ex.code)
				.join("\n")
			return exampleCode
				? template.examples.replace("{examples}", exampleCode)
				: ""
		})()
		: ""

	const lawsSection = (metadata.laws && metadata.laws.length > 0)
		? (() => {
			const lawsList = metadata.laws
				.map((law) => `- ${law.name}: \`${law.formula}\``)
				.join("\n")
			return lawsList ? template.laws.replace("{laws}", lawsList) : ""
		})()
		: ""

	const complexitySection = template.complexity.replace(
		"{complexity}",
		metadata.properties.complexity,
	)

	const relatedSection = (metadata.relatedFunctions &&
		metadata.relatedFunctions.length > 0)
		? template.related.replace(
			"{related}",
			metadata.relatedFunctions.join(", "),
		)
		: ""

	return [
		header,
		propertiesSection,
		signatureSection,
		examplesSection,
		lawsSection,
		complexitySection,
		relatedSection,
	].filter(Boolean).join("")
}
