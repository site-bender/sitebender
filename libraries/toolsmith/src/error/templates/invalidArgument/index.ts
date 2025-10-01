//++ Creates an error message for invalid arguments with specific reason
export function invalidArgument(op: string) {
	return function withParam(param: string) {
		return function withReason(reason: string) {
			return `${op} received invalid ${param}: ${reason}`
		}
	}
}

// const error = invalidArgument("setAge")("age")("must be positive")
// // Returns: "setAge received invalid age: must be positive"

// const validateInput = invalidArgument("processData")
// const invalidFormat = validateInput("format")
// const message = invalidFormat("expected JSON or XML")
// // Returns: "processData received invalid format: expected JSON or XML"
