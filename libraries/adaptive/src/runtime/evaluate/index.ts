import type {
	ComparatorNode,
	InjectorNode,
	Node,
	OperatorNode,
} from "../../../types/ir/index.ts"
import type { ComposeContext } from "../../context/composeContext/index.ts"

import { getComparator } from "../../operations/registries/comparators.ts"
import { getInjector } from "../../operations/registries/injectors.ts"
import { getOperator } from "../../operations/registries/operators.ts"

export default async function evaluate(
	node: Node,
	ctx: ComposeContext,
): Promise<unknown> {
	switch (node.kind) {
		case "injector": {
			const exec = getInjector(node.injector)
			if (!exec) throw new Error(`Injector not registered: ${node.injector}`)
			return await exec(node as InjectorNode, ctx)
		}
		case "operator": {
			const exec = getOperator(node.op)
			if (!exec) throw new Error(`Operator not registered: ${node.op}`)
			const opNode = node as OperatorNode
			const evalArg = (n: OperatorNode["args"][number]) => evaluate(n, ctx)
			return await exec(opNode, evalArg, ctx)
		}
		case "comparator": {
			const exec = getComparator(node.cmp)
			if (!exec) throw new Error(`Comparator not registered: ${node.cmp}`)
			const cmpNode = node as ComparatorNode
			const evalArg = (n: ComparatorNode["args"][number]) => evaluate(n, ctx)
			return await exec(cmpNode, evalArg, ctx)
		}
		default:
			return undefined
	}
}
