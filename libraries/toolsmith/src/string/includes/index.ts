/*++
 + Checks if a substring is included in a string
 + Returns boolean indicating presence
 + Curried for partial application with fixed string
 */
export default function includes(str: string) {
	return function includesWithString(substring: string): boolean {
		//++ [EXCEPTION] .includes() permitted in Toolsmith for performance - provides curried includes wrapper
		return str.includes(substring)
	}
}
