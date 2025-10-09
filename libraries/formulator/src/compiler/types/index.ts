//++ Type definitions for the enriched/compiled AST with datatype annotations

// Re-export parser types as base
export type {
	AstNode,
	BinaryOperator,
	BinaryOperatorNode,
	FunctionCallNode,
	GroupNode,
	NumberLiteralNode,
	UnaryOperator,
	UnaryOperatorNode,
	VariableNode,
} from "../../parser/types/index.ts"

// ============================================================================
// Datatype System (matches Architect conventions)
// ============================================================================

export type NumericDatatype = "Number" | "Float" | "Integer" | "Precision"
export type StringDatatype = "String"
export type BooleanDatatype = "Boolean"
export type TemporalDatatype = "Date" | "Time" | "DateTime" | "Duration"
export type ComplexDatatype = "Json" | "Array" | "Map" | "Set"

export type Datatype =
	| NumericDatatype
	| StringDatatype
	| BooleanDatatype
	| TemporalDatatype
	| ComplexDatatype

// ============================================================================
// Operation Names (semantic, not symbolic)
// ============================================================================

//++ Semantic names for binary operations (used by Toolsmith)
export type BinaryOperation =
	| "add"
	| "subtract"
	| "multiply"
	| "divide"
	| "power"

//++ Semantic names for unary operations (used by Toolsmith)
export type UnaryOperation = "negate" | "factorial"

// ============================================================================
// Enriched AST Nodes (Parser AST + Datatype + Operation)
// ============================================================================

//++ Number literal with inferred datatype
export type EnrichedNumberLiteralNode = {
	readonly _tag: "numberLiteral"
	readonly value: number
	readonly position: number
	readonly datatype: NumericDatatype
}

//++ Variable reference with inferred/declared datatype
export type EnrichedVariableNode = {
	readonly _tag: "variable"
	readonly name: string
	readonly position: number
	readonly datatype: Datatype
}

//++ Binary operator with semantic operation name and datatype
export type EnrichedBinaryOperatorNode = {
	readonly _tag: "binaryOperator"
	readonly operator: BinaryOperation // NOT BinaryOperator (plus/minus/etc)
	readonly left: EnrichedAstNode
	readonly right: EnrichedAstNode
	readonly position: number
	readonly datatype: Datatype
}

//++ Unary operator with semantic operation name and datatype
export type EnrichedUnaryOperatorNode = {
	readonly _tag: "unaryOperator"
	readonly operator: UnaryOperation // NOT UnaryOperator
	readonly operand: EnrichedAstNode
	readonly position: number
	readonly datatype: Datatype
}

//++ Function call with inferred datatype
export type EnrichedFunctionCallNode = {
	readonly _tag: "functionCall"
	readonly name: string
	readonly arguments: ReadonlyArray<EnrichedAstNode>
	readonly position: number
	readonly datatype: Datatype
}

//++ Grouped expression with propagated datatype
export type EnrichedGroupNode = {
	readonly _tag: "group"
	readonly expression: EnrichedAstNode
	readonly position: number
	readonly datatype: Datatype
}

//++ Union of all enriched AST node types
export type EnrichedAstNode =
	| EnrichedNumberLiteralNode
	| EnrichedVariableNode
	| EnrichedBinaryOperatorNode
	| EnrichedUnaryOperatorNode
	| EnrichedFunctionCallNode
	| EnrichedGroupNode

// ============================================================================
// Compilation Metadata
// ============================================================================

//++ Metadata about variables discovered during compilation
export type VariableMetadata = {
	readonly name: string
	readonly datatype: Datatype
	readonly positions: ReadonlyArray<number> // All positions where variable appears
}

//++ Metadata about constants used in formula (π, e, etc.)
export type ConstantMetadata = {
	readonly name: string
	readonly value: number
	readonly datatype: NumericDatatype
}

//++ Metadata about functions called in formula
export type FunctionMetadata = {
	readonly name: string
	readonly arity: number // Number of arguments
	readonly returnDatatype: Datatype
}

//++ Complete compilation metadata
export type CompilationMetadata = {
	readonly variables: ReadonlyMap<string, VariableMetadata>
	readonly constants: ReadonlyMap<string, ConstantMetadata>
	readonly functions: ReadonlyMap<string, FunctionMetadata>
	readonly outputDatatype: Datatype
}

// ============================================================================
// Compiled Formula (Final Output)
// ============================================================================

//++ The result of compilation: enriched AST + metadata
export type CompiledFormula = {
	readonly _tag: "compiledFormula"
	readonly ast: EnrichedAstNode
	readonly metadata: CompilationMetadata
	readonly sourceFormula: string // Original formula string for debugging
}
