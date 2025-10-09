// @sitebender/arborist/demo/examples/types
//++ Example type definitions

//++ User type with branded email
export type User = Readonly<{
	id: number
	name: string
	email: string
	active: boolean
}>

//++ Result type for operations that can fail
export type Result<E, T> =
	| Readonly<{ _tag: "Ok"; value: T }>
	| Readonly<{ _tag: "Error"; error: E }>

//++ Generic container type
export type Container<T> = Readonly<{
	value: T
	metadata: Readonly<{
		created: Date
		updated: Date
	}>
}>
