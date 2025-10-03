import type { VariableNode } from "../../../parser/types/index.ts"
import type { EnrichedVariableNode } from "../../types/index.ts"
import { DEFAULT_VARIABLE_DATATYPE } from "../../constants/index.ts"

//++ Enriches variable node with datatype annotation
export default function enrichVariable(
	node: VariableNode,
): EnrichedVariableNode {
	return Object.freeze({
		_tag: "variable",
		name: node.name,
		position: node.position,
		datatype: DEFAULT_VARIABLE_DATATYPE,
	})
}
