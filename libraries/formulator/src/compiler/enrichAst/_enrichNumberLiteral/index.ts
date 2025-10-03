import type { NumberLiteralNode } from "../../../parser/types/index.ts"
import type { EnrichedNumberLiteralNode } from "../../types/index.ts"
import { DEFAULT_NUMERIC_DATATYPE } from "../../constants/index.ts"

//++ Enriches number literal node with datatype annotation
export default function enrichNumberLiteral(
	node: NumberLiteralNode,
): EnrichedNumberLiteralNode {
	return Object.freeze({
		_tag: "numberLiteral",
		value: node.value,
		position: node.position,
		datatype: DEFAULT_NUMERIC_DATATYPE,
	})
}
