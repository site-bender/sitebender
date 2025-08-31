import type {
	ComparatorNode,
	InjectorNode,
	Node,
	OperatorNode,
} from "../../../types/ir/index.ts"
import type { ComposeContext } from "../../context/composeContext/index.ts"

import { getComparator } from "../../operations/registries/comparators.ts"
import { getPolicy } from "../../operations/registries/policies.ts"
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
			const cmpNode = node as ComparatorNode
			const evalArg = (n: ComparatorNode["args"][number]) => evaluate(n, ctx)
			if (exec) return await exec(cmpNode, evalArg, ctx)
			// Fallback: treat comparator tag as a policy; pass first arg (if any) as policy config
			const policy = getPolicy(node.cmp)
			if (!policy) throw new Error(`Comparator not registered: ${node.cmp}`)
			const cfg = cmpNode.args[0] ? await evalArg(cmpNode.args[0]) : undefined
			const op = policy(cfg)
			// Policy executors return OperationFunction<boolean>
			const fn = op as unknown as (
				_arg: unknown,
				localValues?: Record<string, unknown>,
			) => Promise<unknown> | unknown
			// For comparator semantics, we call the operation with undefined arg and localValues from ctx if available
			// ComposeContext currently doesn't expose localValues; allow undefined
			const res = await fn(undefined, ctx?.localValues as unknown as Record<string, unknown>)
			if (typeof res === "object" && res && ("right" in (res as Record<string, unknown>) || "left" in (res as Record<string, unknown>))) {
				const either = res as { right?: unknown; left?: unknown }
				return Boolean("right" in either && either.right === true)
			}
			return Boolean(res)
		}
		default:
			return undefined
	}
}
