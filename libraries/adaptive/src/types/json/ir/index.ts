// Adaptive IR node types (v 0.1.0)

export type Version = "0.1.0"

export type DataType =
	| "String"
	| "Integer"
	| "Float"
	| "Boolean"
	| "PlainDate"
	| "PlainDateTime"
	| "ZonedDateTime"

export type NodeId = string

export interface BaseMeta {
	source?: string
	debug?: Record<string, unknown>
}

export interface BaseNode {
	v: Version
	id: NodeId
	kind: string
	meta?: BaseMeta
}

export interface ElementNode extends BaseNode {
	kind: "element"
	tag: string
	attrs: Record<string, string | number | boolean>
	children: Array<Node>
}

export interface InjectorNode<T = unknown> extends BaseNode {
	kind: "injector"
	injector: string // e.g., "Constant", "FromElement"
	datatype: DataType
	args: Record<string, unknown>
}

export interface OperatorNode<T = unknown> extends BaseNode {
	kind: "operator"
	op: string // e.g., "Add", "Multiply"
	datatype: DataType
	args: Array<Node>
}

export interface ComparatorNode extends BaseNode {
	kind: "comparator"
	cmp: string // e.g., "And", "IsEmailAddress", "MinLength"
	args: Array<Node>
}

export interface ConditionalNode extends BaseNode {
	kind: "conditional"
	condition: ComparatorNode
	ifTrue: Array<Node>
	ifFalse: Array<Node>
}

export interface ValidatorNode extends BaseNode {
	kind: "validator"
	rule: ComparatorNode
	scope: NodeId | "self"
	mode?: "accumulate" | "short-circuit"
}

export interface ActionNode extends BaseNode {
	kind: "action"
	action: string // e.g., "Submit", "SetValue"
	args: Array<Node>
}

export interface EventBindingNode extends BaseNode {
	kind: "on"
	event: string // DOM event name
	handler: ActionNode
}

export type Node =
	| ElementNode
	| InjectorNode
	| OperatorNode
	| ComparatorNode
	| ConditionalNode
	| ValidatorNode
	| ActionNode
	| EventBindingNode

export interface IrDocument extends ElementNode {
	// Element root
}

export const IR_VERSION: Version = "0.1.0"
