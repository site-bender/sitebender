// Local types for parseSourceFile
export type ParseOptions = {
	readonly target?: "ES2022" | "ESNext" | "ES2020"
	readonly module?: "ESNext" | "CommonJS" | "NodeNext"
	readonly strict?: boolean
	readonly skipTypeChecking?: boolean
}