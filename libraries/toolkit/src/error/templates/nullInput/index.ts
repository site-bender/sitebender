//++ Creates an error message for null or undefined input parameters
export function nullInput(op: string) {
	return function withParam(param: string) {
		return `${op} received null/undefined for required parameter '${param}'`
	}
}

//?? [EXAMPLE]
// const error = nullInput("calculateTotal")("items")
// // Returns: "calculateTotal received null/undefined for required parameter 'items'"

//?? [GOTCHA] This is for required parameters only - optional parameters should handle null gracefully