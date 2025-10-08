//++ Error message templates for consistent error formatting

//++ Creates a type mismatch error message with expected and actual types
export function typeMismatch(op: string) {
	return function withExpected(expected: string) {
		return function withActual(actual: string) {
			return `${op} expected ${expected} but received ${actual}`
		}
	}
}

//++ Creates an error message for null or undefined input parameters
export function nullInput(op: string) {
	return function withParam(param: string) {
		return `${op} received null/undefined for required parameter '${param}'`
	}
}

//++ Creates a generic operation failure message with reason
export function operationFailed(op: string) {
	return function withReason(reason: string) {
		return `${op} failed: ${reason}`
	}
}

//++ Creates an error message for validation failures with rules
export function validationFailed(op: string) {
	return function withWhat(what: string) {
		return function withRules(rules: string) {
			return `${op}: ${what} failed validation: ${rules}`
		}
	}
}

//++ Creates an error message for parsing failures
export function parseError(op: string) {
	return function withWhat(what: string) {
		return function withInput(input: string) {
			return `${op}: Could not parse ${what} from "${input}"`
		}
	}
}

//++ Creates an error message for when a callback function throws
export function callbackThrew(op: string) {
	return function withCallbackName(callbackName: string) {
		return function withMessage(message: string) {
			return `${op}: ${callbackName} threw an error: ${message}`
		}
	}
}

//++ Creates an error message for division by zero with optional context
export function divisionByZero(op: string) {
	return function withContext(context: string) {
		return `${op}: Division by zero${context ? ` in ${context}` : ""}`
	}
}

//++ Creates an error message for invalid arguments with specific reason
export function invalidArgument(op: string) {
	return function withParam(param: string) {
		return function withReason(reason: string) {
			return `${op} received invalid ${param}: ${reason}`
		}
	}
}

//++ Creates an error message for missing items or resources
export function notFound(op: string) {
	return function withWhat(what: string) {
		return function withWhere(where: string) {
			return `${op}: ${what} not found in ${where}`
		}
	}
}

//++ Creates an error message for values outside acceptable range
export function outOfRange(op: string) {
	return function withParam(param: string) {
		return function withMin(min: number) {
			return function withMax(max: number) {
				return function withActual(actual: number) {
					return `${op}: ${param} must be between ${min} and ${max}, got ${actual}`
				}
			}
		}
	}
}
