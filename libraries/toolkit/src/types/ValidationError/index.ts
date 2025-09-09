//++ Structured validation error with field and messages for semigroup combining
export default type ValidationError = {
	field: string
	messages: Array<string>
}