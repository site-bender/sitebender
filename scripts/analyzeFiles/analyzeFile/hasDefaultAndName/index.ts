//++ Checks if a regex match has both export default and a function name
export default function hasDefaultAndName(match: RegExpExecArray): boolean {
	return !!(match[1] && match[3])
}