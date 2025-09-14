//++ Creates a type mismatch error message with expected and actual types
export function typeMismatch(op: string) {
	return function withExpected(expected: string) {
		return function withActual(actual: string) {
			return `${op} expected ${expected} but received ${actual}`
		}
	}
}

//?? [EXAMPLE]
// const error = typeMismatch("parseNumber")("number")("string")
// // Returns: "parseNumber expected number but received string"

//?? [EXAMPLE] With partial application
// const parseError = typeMismatch("parseJSON")
// const expectObject = parseError("object")
// const message = expectObject("null")
// // Returns: "parseJSON expected object but received null"