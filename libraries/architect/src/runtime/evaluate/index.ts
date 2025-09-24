import type {
	ActionNode,
	ComparatorNode,
	ConditionalNode,
	ElementNode,
	InjectorNode,
	Node,
	OperatorNode,
	ValidatorNode,
} from "../../../types/ir/index.ts"
import type { ComposeContext } from "../../context/composeContext/index.ts"

import actions from "../../operations/registries/actions.ts"
import comparators from "../../operations/registries/comparators.ts"
import injectors from "../../operations/registries/injectors.ts"
import operators from "../../operations/registries/operators.ts"
import policies from "../../operations/registries/policies.ts"

export default async function evaluate(
	node: Node,
	ctx: ComposeContext,
): Promise<unknown> {
	switch (node.kind) {
		case "injector": {
			const exec = injectors.get(node.injector)
			if (!exec) {
				throw new Error(`Injector not registered: ${node.injector}`)
			}
			return await exec(node as InjectorNode, ctx)
		}
		case "operator": {
			const exec = operators.get(node.op)
			if (!exec) throw new Error(`Operator not registered: ${node.op}`)
			const opNode = node as OperatorNode
			const evalArg = (n: OperatorNode["args"][number]) => evaluate(n, ctx)
			return await exec(opNode, evalArg, ctx)
		}
		case "comparator": {
			const exec = comparators.get(node.cmp)
			const cmpNode = node as ComparatorNode
			const evalArg = (n: ComparatorNode["args"][number]) => evaluate(n, ctx)
			if (exec) return await exec(cmpNode, evalArg, ctx)
			// Fallback: treat comparator tag as a policy; pass first arg (if any) as policy config
			const policy = policies.get(node.cmp)
			if (!policy) {
				throw new Error(`Comparator not registered: ${node.cmp}`)
			}
			const cfg = cmpNode.args[0] ? await evalArg(cmpNode.args[0]) : undefined
			const op = policy(cfg)
			// Policy executors return OperationFunction<boolean>
			const fn = op as unknown as (
				_arg: unknown,
				localValues?: Record<string, unknown>,
			) => Promise<unknown> | unknown
			// For comparator semantics, we call the operation with undefined arg and localValues from ctx if available
			// ComposeContext currently doesn't expose localValues; allow undefined
			const res = await fn(
				undefined,
				ctx?.localValues as unknown as Record<string, unknown>,
			)
			if (
				typeof res === "object" && res &&
				("right" in (res as Record<string, unknown>) ||
					"left" in (res as Record<string, unknown>))
			) {
				const either = res as { right?: unknown; left?: unknown }
				return Boolean("right" in either && either.right === true)
			}
			return Boolean(res)
		}
		case "conditional": {
			const condNode = node as ConditionalNode
			const conditionResult = await evaluate(condNode.condition, ctx)
			const branch = conditionResult ? condNode.ifTrue : condNode.ifFalse
			// Evaluate all nodes in the selected branch sequentially and return the last result
			if (branch.length === 0) return undefined

			// Sequential evaluation required for conditional branches
			const evaluateSequentially = async (
				nodes: Node[],
			): Promise<unknown> => {
				let result: unknown = undefined
				for (const node of nodes) {
					// deno-lint-ignore no-await-in-loop
					result = await evaluate(node, ctx)
				}
				return result
			}

			return evaluateSequentially(branch)
		}
		case "action": {
			const actionNode = node as ActionNode
			const exec = actions.get(actionNode.action)
			if (!exec) {
				throw new Error(`Action not registered: ${actionNode.action}`)
			}
			const evalArg = (n: ActionNode["args"][number]) => evaluate(n, ctx)
			return await exec(actionNode, evalArg, ctx)
		}
		case "validator": {
			const validatorNode = node as ValidatorNode
			// For now, just evaluate the rule and return the boolean result
			return await evaluate(validatorNode.rule, ctx)
		}
		case "element": {
			const elementNode = node as ElementNode
			// For element nodes, we typically want to render them to HTML
			// For evaluation purposes, we can return the element structure
			// This will be used during rendering phases
			const childPromises = elementNode.children.map((child) =>
				evaluate(child, ctx)
			)
			const evaluatedChildren = await Promise.all(childPromises)
			return {
				tag: elementNode.tag,
				attrs: elementNode.attrs,
				children: evaluatedChildren,
			}
		}
		case "on":
			// Event binding nodes are handled during hydration, not evaluation
			return undefined
		default:
			return undefined
	}
}
