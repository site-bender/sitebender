// DEPRECATED: Re-export legacy IR types from the new canonical locations.
// This file remains temporarily for backward compatibility and will be removed.

export type {
	Version,
	DataType,
	NodeId,
	BaseMeta,
	BaseNode,
	ElementNode,
	InjectorNode,
	OperatorNode,
	ComparatorNode,
	ConditionalNode,
	ValidatorNode,
	ActionNode,
	EventBindingNode,
	Node,
	IrDocument,
} from "../ir/index.ts"

export { IR_VERSION } from "../../constants/ir/index.ts"
