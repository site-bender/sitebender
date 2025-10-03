//++ Type definitions for the Abstract Syntax Tree (AST) nodes

export type AstNode =
	| NumberLiteralNode
	| VariableNode
	| BinaryOperatorNode
	| UnaryOperatorNode
	| FunctionCallNode
	| GroupNode

export type NumberLiteralNode = {
	readonly _tag: "numberLiteral"
	readonly value: number
	readonly position: number
}

export type VariableNode = {
	readonly _tag: "variable"
	readonly name: string
	readonly position: number
}

export type BinaryOperatorNode = {
	readonly _tag: "binaryOperator"
	readonly operator: BinaryOperator
	readonly left: AstNode
	readonly right: AstNode
	readonly position: number
}

export type UnaryOperatorNode = {
	readonly _tag: "unaryOperator"
	readonly operator: UnaryOperator
	readonly operand: AstNode
	readonly position: number
}

export type FunctionCallNode = {
	readonly _tag: "functionCall"
	readonly name: string
	readonly arguments: ReadonlyArray<AstNode>
	readonly position: number
}

export type GroupNode = {
	readonly _tag: "group"
	readonly expression: AstNode
	readonly position: number
}

export type BinaryOperator = "plus" | "minus" | "multiply" | "divide" | "power"

export type UnaryOperator = "negate" | "factorial"
