//++ Structured validation error with field and messages for semigroup combining
type ValidationError = {
	field: string
	messages: Array<string>
}

export type { ValidationError }
export default ValidationError
