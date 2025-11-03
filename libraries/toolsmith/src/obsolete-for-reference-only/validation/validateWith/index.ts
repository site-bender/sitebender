//++ Validates a value with a predicate, returns value if valid or null if invalid
export default function validateWith<T>(predicate: (value: T) => boolean) {
	return function validateWithPredicate(errorMsg: string) {
		return function validate(value: T): T | null {
			if (predicate(value)) {
				return value
			}

			return null
		}
	}
}
