/**
 * Counts the number of curry levels in a return type
 * @param returnType Return type string
 * @returns Number of curry levels
 */
export default function countCurryLevels(returnType: string): number {
	const matches = returnType.match(/=>/g)
	return matches ? matches.length : 0
}