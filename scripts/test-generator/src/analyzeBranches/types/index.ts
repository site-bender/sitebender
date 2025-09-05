/**
 * Type definitions for branch analysis
 */

export interface BranchInfo {
	id: string
	type: 'if' | 'ternary' | 'switch' | 'logical' | 'try'
	condition: string
	location: { line: number, column: number }
	requiredInputs: Array<TestInput>
	parentFunction?: string
}

export interface TestInput {
	description: string
	value: unknown
}

export interface ASTNode {
	type: string
	loc?: {
		start: { line: number, column: number }
		end: { line: number, column: number }
	}
	test?: ASTNode
	consequent?: ASTNode | Array<ASTNode>
	alternate?: ASTNode | null
	left?: ASTNode
	right?: ASTNode
	operator?: string
	discriminant?: ASTNode
	cases?: Array<ASTNode>
	block?: ASTNode
	handler?: ASTNode
	finalizer?: ASTNode
	name?: string
	value?: unknown
	raw?: string
	body?: ASTNode | Array<ASTNode>
	expression?: ASTNode
	callee?: ASTNode
	arguments?: Array<ASTNode>
	declarations?: Array<ASTNode>
	init?: ASTNode
	id?: ASTNode
	params?: Array<ASTNode>
}