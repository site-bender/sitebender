// DEPRECATED: Re-export legacy IR types from the new canonical locations.
// This file remains temporarily for backward compatibility and will be removed.

export type {
	ActionNode,
	BaseMeta,
	BaseNode,
	ComparatorNode,
	ConditionalNode,
	DataType,
	ElementNode,
	EventBindingNode,
	InjectorNode,
	IrDocument,
	Node,
	NodeId,
	OperatorNode,
	ValidatorNode,
	Version,
} from "../../ir/index.ts"

export { IR_VERSION } from "../../../constants/ir/index.ts"
