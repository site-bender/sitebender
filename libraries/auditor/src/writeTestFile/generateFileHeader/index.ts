import type { TestFileMetadata } from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function generateFileHeader(metadata: TestFileMetadata): string {
	const lines: Array<string> = []

	lines.push(
		"//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style",
	)

	return lines.join("\n")
}
