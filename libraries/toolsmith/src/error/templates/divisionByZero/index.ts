//++ Creates an error message for division by zero with optional context
export function divisionByZero(op: string) {
	return function withContext(context: string) {
		return `${op}: Division by zero${context ? ` in ${context}` : ""}`
	}
}

// const error = divisionByZero("calculateAverage")("student grades")
// // Returns: "calculateAverage: Division by zero in student grades"

// const simpleError = divisionByZero("divide")("")
// // Returns: "divide: Division by zero"
