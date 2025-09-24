//++ Returns true if a flag is present in the provided argv list (private helper)
export function _includesFlag(values: string[], flag: string): boolean {
	for (let i = 0; i < values.length; i++) {
		if (values[i] === flag) {
			return true
		}
	}
	return false
}
