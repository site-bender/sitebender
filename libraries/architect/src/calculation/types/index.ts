import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

//++ Base AST node type - all calculation nodes extend this
export type AstNode = Readonly<{
	id: string
	type: string
	sourceLocation?: SourceLocation
}>

//++ Source location for error reporting
export type SourceLocation = Readonly<{
	line: number
	column: number
	file: string
}>

//++ Async thunk - lazy evaluation wrapper for calculations
export type AsyncThunk<T> = {
	(): Promise<Validation<ValidationError, T>>
}

//++ Operation node - represents operations like Add, Multiply
export type OperationNode = AstNode & Readonly<{
	operation: string
	children: ReadonlyArray<AstNode>
}>

//++ Data source node - fetches data asynchronously
export type DataSourceNode = AstNode & Readonly<{
	source: string
	config: DataSourceConfig
}>

//++ Configuration for data sources
export type DataSourceConfig = Readonly<{
	key?: string
	path?: string
	selector?: string
	value?: unknown
}>

//++ Component schema - defines structure and validation rules for JSX components
export type ComponentSchema = Readonly<{
	name: string
	category: ComponentCategory
	children: ChildrenSpec
	attributes: AttributeSpec
	returnType: string
	validate: (node: unknown) => Validation<ValidationError, void>
}>

//++ Component category
export type ComponentCategory = "Operation" | "DataSource" | "Container"

//++ Children specification
export type ChildrenSpec =
	| Readonly<{ type: "none" }>
	| Readonly<{
		type: "exact"
		count: number
		names: ReadonlyArray<string>
	}>
	| Readonly<{ type: "any"; min?: number; max?: number }>

//++ Attribute specification
export type AttributeSpec = Readonly<{
	required: ReadonlyArray<string>
	optional: ReadonlyArray<string>
	types: Readonly<Record<string, string>>
}>

//++ Component registry - immutable map of component schemas
export type Registry = Readonly<{
	schemas: ReadonlyMap<string, ComponentSchema>
}>

//++ Intermediate representation type
export type CalculationIr = Readonly<{
	root: IrNode
}>

//++ IR node type
export type IrNode = Readonly<{
	name: string
	attributes: Readonly<Record<string, unknown>>
	children: ReadonlyArray<IrNode>
	sourceLocation?: SourceLocation
}>
