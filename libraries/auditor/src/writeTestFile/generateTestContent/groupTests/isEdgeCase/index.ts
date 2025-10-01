import type { TestCase } from "../../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function isEdgeCase(test: TestCase): boolean {
	const edgeCaseKeywords = [
		"empty",
		"null",
		"undefined",
		"zero",
		"negative",
		"maximum",
		"minimum",
		"boundary",
		"edge",
	]

	const name = test.name.toLowerCase()
	const description = test.description.toLowerCase()

	return edgeCaseKeywords.some(
		(keyword) => name.includes(keyword) || description.includes(keyword),
	)
}
