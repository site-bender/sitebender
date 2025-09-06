import type { TestCase } from "../../../../types/index.ts"

/**
 * Determines if a test case is an edge case
 * @param test Test case to check
 * @returns True if the test is an edge case
 */
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
		(keyword) => name.includes(keyword) || description.includes(keyword)
	)
}