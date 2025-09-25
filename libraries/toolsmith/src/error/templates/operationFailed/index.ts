//++ Creates a generic operation failure message with reason
export function operationFailed(op: string) {
	return function withReason(reason: string) {
		return `${op} failed: ${reason}`
	}
}

//?? [EXAMPLE]
// const error = operationFailed("saveFile")("disk full")
// // Returns: "saveFile failed: disk full"

//?? [PRO] Simple and flexible for any operation failure
