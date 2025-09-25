//++ Creates an error message for when a callback function throws
export function callbackThrew(op: string) {
	return function withCallbackName(callbackName: string) {
		return function withMessage(message: string) {
			return `${op}: ${callbackName} threw an error: ${message}`
		}
	}
}

//?? [EXAMPLE]
// const error = callbackThrew("map")("transform function")("Cannot read property 'x' of undefined")
// // Returns: "map: transform function threw an error: Cannot read property 'x' of undefined"

//?? [GOTCHA] Always wrap callbacks in try-catch when using this template
