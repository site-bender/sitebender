//++ Creates an error message for missing items or resources
export function notFound(op: string) {
	return function withWhat(what: string) {
		return function withWhere(where: string) {
			return `${op}: ${what} not found in ${where}`
		}
	}
}

//?? [EXAMPLE]
// const error = notFound("getData")("user")("database")
// // Returns: "getData: user not found in database"

//?? [EXAMPLE] File system operations
// const fileError = notFound("readConfig")("config.json")("/etc/app/")
// // Returns: "readConfig: config.json not found in /etc/app/"
