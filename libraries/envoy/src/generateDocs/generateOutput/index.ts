import type { FunctionMetadata, GenerateOptions } from "../../types/index.ts"

import { generateMarkdown } from "../../generators/index.ts"

//++ Generate documentation output based on format
export default function generateOutput(
	docMetadata: FunctionMetadata,
	options: GenerateOptions,
): string {
	switch (options.format) {
		case "markdown":
			return generateMarkdown(docMetadata)
		case "html":
			// TODO(@envoy): Implement HTML generation
			return generateMarkdown(docMetadata)
		case "json":
			return JSON.stringify(docMetadata, null, 2)
		default:
			return generateMarkdown(docMetadata)
	}
}
