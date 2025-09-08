//++ Standard error message templates for consistent error messaging

export function TYPE_MISMATCH(op: string) {
	return function withExpected(expected: string) {
		return function withActual(actual: string) {
			return `${op} expected ${expected} but received ${actual}`
		}
	}
}

export function NULL_INPUT(op: string) {
	return function withParam(param: string) {
		return `${op} received null/undefined for required parameter '${param}'`
	}
}

export function INVALID_ARGUMENT(op: string) {
	return function withParam(param: string) {
		return function withReason(reason: string) {
			return `${op} received invalid ${param}: ${reason}`
		}
	}
}

export function OPERATION_FAILED(op: string) {
	return function withReason(reason: string) {
		return `${op} failed: ${reason}`
	}
}

export function CALLBACK_THREW(op: string) {
	return function withCallbackName(callbackName: string) {
		return function withMessage(message: string) {
			return `${op}: ${callbackName} threw an error: ${message}`
		}
	}
}

export function OUT_OF_RANGE(op: string) {
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

export function NOT_FOUND(op: string) {
	return function withWhat(what: string) {
		return function withWhere(where: string) {
			return `${op}: ${what} not found in ${where}`
		}
	}
}

export function PARSE_ERROR(op: string) {
	return function withWhat(what: string) {
		return function withInput(input: string) {
			return `${op}: Could not parse ${what} from "${input}"`
		}
	}
}

export function VALIDATION_FAILED(op: string) {
	return function withWhat(what: string) {
		return function withRules(rules: string) {
			return `${op}: ${what} failed validation: ${rules}`
		}
	}
}

export function DIVISION_BY_ZERO(op: string) {
	return function withContext(context: string) {
		return `${op}: Division by zero${context ? ` in ${context}` : ""}`
	}
}
