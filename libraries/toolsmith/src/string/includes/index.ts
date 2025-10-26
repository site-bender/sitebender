/*++
 + Checks if a substring is included in a string
 + Returns boolean indicating presence
 + Curried for partial application with fixed string
 */
export default function includes(str: string) {
	return function includesWithString(substring: string): boolean {
		return str.includes(substring)
	}
}
