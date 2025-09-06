import type { TestFileMetadata } from "../../types/index.ts"

/**
 * Generates file header comment for test files
 * @param metadata Test file metadata information
 * @returns Generated file header comment string
 */
export default function generateFileHeader(metadata: TestFileMetadata): string {
	const lines: Array<string> = []
	
	lines.push("/**")
	lines.push(` * Auto-generated test file`)
	lines.push(` * Source: ${metadata.sourceFile}`)
	lines.push(` * Generated: ${metadata.generatedAt}`)
	lines.push(` * Generator: ${metadata.generator} v${metadata.version}`)
	lines.push(" * ")
	lines.push(" * DO NOT EDIT MANUALLY")
	lines.push(" * Regenerate using: deno run --allow-all scripts/test-generator/src/index.ts")
	lines.push(" */")
	
	return lines.join("\n")
}