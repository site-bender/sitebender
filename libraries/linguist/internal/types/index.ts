// Core function signature shared by all libraries
export type FunctionSignature = {
	readonly name: string
	readonly filePath: string
	readonly parameters: ReadonlyArray<Parameter>
	readonly returnType: TypeInfo
	readonly generics?: ReadonlyArray<Generic>
	readonly isAsync: boolean
	readonly isGenerator: boolean
	readonly isCurried: boolean
	readonly isPure: boolean
	readonly isExported: boolean
	readonly isDefault: boolean
}

// Parameter information
export type Parameter = {
	readonly name: string
	readonly type: TypeInfo
	readonly isOptional: boolean
	readonly isRest: boolean
	readonly defaultValue?: string
}

// Type information
export type TypeInfo = {
	readonly raw: string
	readonly kind: TypeKind
	readonly typeArguments?: ReadonlyArray<TypeInfo>
	readonly members?: ReadonlyArray<Member>
	readonly elementType?: TypeInfo
	readonly constraint?: string
}

// Type categories
export enum TypeKind {
	Primitive = "primitive",
	Array = "array",
	Object = "object",
	Function = "function",
	Union = "union",
	Intersection = "intersection",
	Generic = "generic",
	Literal = "literal",
	Unknown = "unknown",
	Any = "any",
	Void = "void",
	Never = "never",
	Null = "null",
	Undefined = "undefined",
}

// Generic type parameter
export type Generic = {
	readonly name: string
	readonly constraint?: string
	readonly default?: string
}

// Object member
export type Member = {
	readonly name: string
	readonly type: TypeInfo
	readonly isOptional: boolean
	readonly isReadonly: boolean
}

// Branch information for coverage
export type BranchInfo = {
	readonly id: string
	readonly type: BranchType
	readonly condition: string
	readonly startLine: number
	readonly endLine: number
	readonly branches: ReadonlyArray<BranchPath>
}

export enum BranchType {
	If = "if",
	Ternary = "ternary",
	Switch = "switch",
	Try = "try",
	LogicalAnd = "&&",
	LogicalOr = "||",
	NullishCoalescing = "??",
}

export type BranchPath = {
	readonly id: string
	readonly condition: string
	readonly isCovered: boolean
}

// Result monad for error handling
export type Result<T, E> =
	| { readonly ok: true; readonly value: T }
	| { readonly ok: false; readonly error: E }

// Parse errors
export type ParseError = {
	readonly type: "ParseError" | "FileNotFound" | "SyntaxError"
	readonly message: string
	readonly file?: string
	readonly line?: number
	readonly column?: number
}

// Ast node (simplified)
export type AstNode = {
	readonly kind: string
	readonly text: string
	readonly children?: ReadonlyArray<AstNode>
	readonly position?: Position
}

export type Position = {
	readonly line: number
	readonly column: number
}

// Raw comment information for Envoy
export type RawComment = {
	readonly kind: "line" | "block"
	readonly text: string // Trimmed content
	readonly fullText: string // Original with markers
	readonly start: number
	readonly end: number
	readonly line: number // 1-based
	readonly column: number // 1-based
	readonly nodeId?: string // Associated function name
}
