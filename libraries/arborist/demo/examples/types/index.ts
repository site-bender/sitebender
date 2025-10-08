//++ Example type definitions using branded types and discriminated unions
//++ Demonstrates proper TypeScript type design patterns

//++ Branded type for user identifiers
//++ Prevents mixing with other string types
export type UserId = string & { readonly __brand: "UserId" }

//++ Branded type for email addresses
//++ Ensures email strings are distinct from regular strings
export type Email = string & { readonly __brand: "Email" }

//++ User data structure with all fields immutable
export type User = Readonly<{
	id: UserId
	name: string
	email: Email
	isActive: boolean
}>

//++ Validation error for failed input validation
export type ValidationError = Readonly<{
	_tag: "ValidationError"
	field: string
	message: string
}>

//++ Result type for operations that can succeed or fail
export type Result<T, E> =
	| Readonly<{ _tag: "success"; value: T }>
	| Readonly<{ _tag: "failure"; error: E }>
