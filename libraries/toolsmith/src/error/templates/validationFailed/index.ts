//++ Creates an error message for validation failures with rules
export function validationFailed(op: string) {
	return function withWhat(what: string) {
		return function withRules(rules: string) {
			return `${op}: ${what} failed validation: ${rules}`
		}
	}
}

//?? [EXAMPLE]
// const error = validationFailed("createUser")("email")("must be valid email format")
// // Returns: "createUser: email failed validation: must be valid email format"

//?? [EXAMPLE] Multiple rules
// const passwordError = validationFailed("setPassword")("password")
// const message = passwordError("minimum 8 characters, must include uppercase and number")
// // Returns: "setPassword: password failed validation: minimum 8 characters, must include uppercase and number"
