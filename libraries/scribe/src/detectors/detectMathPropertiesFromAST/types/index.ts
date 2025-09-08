//++ Type definitions for AST nodes received from the Parser

export type SyntaxKind = {
	// Binary operators
	PlusToken: number
	MinusToken: number
	AsteriskToken: number
	SlashToken: number
	PercentToken: number
	AmpersandAmpersandToken: number
	BarBarToken: number

	// Comparison
	EqualsEqualsToken: number
	EqualsEqualsEqualsToken: number

	// Assignment
	EqualsToken: number

	// Literals
	NumericLiteral: number
	StringLiteral: number
	TrueKeyword: number
	FalseKeyword: number

	// Other
	Identifier: number
	CallExpression: number
	BinaryExpression: number
	PropertyAccessExpression: number
	ReturnStatement: number
	Block: number
	ArrowFunction: number
	FunctionExpression: number
	FunctionDeclaration: number
	MethodDeclaration: number
	Parameter: number
	IfStatement: number
	ConditionalExpression: number
}

export type AstNode = {
	kind: number
	pos: number
	end: number
	parent?: AstNode
	getText(): string
	getChildCount(): number
	getChildAt(index: number): AstNode | undefined
	forEachChild<T>(cbNode: (node: AstNode) => T | undefined): T | undefined
}

export type Identifier = AstNode & {
	text: string
	escapedText: string
}

export type BinaryExpression = AstNode & {
	left: AstNode
	operatorToken: AstNode
	right: AstNode
}

export type CallExpression = AstNode & {
	expression: AstNode
	arguments: Array<AstNode>
}

export type PropertyAccessExpression = AstNode & {
	expression: AstNode
	name: Identifier
}

export type FunctionLikeNode = AstNode & {
	name?: Identifier
	parameters: Array<ParameterNode>
	body?: AstNode
}

export type ParameterNode = AstNode & {
	name: Identifier
}

export type ReturnStatement = AstNode & {
	expression?: AstNode
}

export type ConditionalExpression = AstNode & {
	condition: AstNode
	whenTrue: AstNode
	whenFalse: AstNode
}

export type SourceFile = AstNode & {
	fileName: string
	text: string
}

//++ Helper type guards that match the shape of TypeScript's type guards
export type TypeGuards = {
	isBinaryExpression(node: AstNode): node is BinaryExpression
	isCallExpression(node: AstNode): node is CallExpression
	isPropertyAccessExpression(node: AstNode): node is PropertyAccessExpression
	isIdentifier(node: AstNode): node is Identifier
	isFunctionDeclaration(node: AstNode): node is FunctionLikeNode
	isFunctionExpression(node: AstNode): node is FunctionLikeNode
	isArrowFunction(node: AstNode): node is FunctionLikeNode
	isMethodDeclaration(node: AstNode): node is FunctionLikeNode
	isReturnStatement(node: AstNode): node is ReturnStatement
	isConditionalExpression(node: AstNode): node is ConditionalExpression
	isParameter(node: AstNode): node is ParameterNode
}
