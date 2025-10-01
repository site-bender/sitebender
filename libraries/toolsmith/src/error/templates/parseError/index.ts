//++ Creates an error message for parsing failures
export function parseError(op: string) {
	return function withWhat(what: string) {
		return function withInput(input: string) {
			return `${op}: Could not parse ${what} from "${input}"`
		}
	}
}

// const error = parseError("parseDate")("date")("2024-13-45")
// // Returns: "parseDate: Could not parse date from \"2024-13-45\""
