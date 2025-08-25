import type { IrDocument, Node, EventBindingNode, ActionNode, ComparatorNode } from "../../../types/ir/index.ts"
import { createComposeContext, type ComposeContext } from "../../context/composeContext.ts"
import { registerDefaultExecutors } from "../../operations/defaults/registerDefaults.ts"
import evaluate from "../evaluate/index.ts"
import { getEvent } from "../../operations/registries/events.ts"
import { getAction } from "../../operations/registries/actions.ts"
import walk from "./walk/index.ts"
import resolveAnchor from "./resolveAnchor/index.ts"

export default function hydrate(ir: IrDocument, ctx?: ComposeContext) {
  const context = ctx ?? createComposeContext({ env: 'client' })
  registerDefaultExecutors(context)

  const bindEvent = (node: EventBindingNode) => {
    const el = resolveAnchor(node)
    if (!el) return
    const binder = getEvent(node.event)
    const handlerAction = node.handler
    if (!binder || !handlerAction) return
    const dispatch = async () => {
      const exec = getAction(handlerAction.action)
      if (!exec) return
      await exec(handlerAction as ActionNode, (n) => evaluate(n, context), context)
    }
    binder(el, node, dispatch, context)
  }

  const validate = async (node: ComparatorNode) => {
    try { await evaluate(node, context) } catch { /* ignore MVP */ }
  }

  walk(ir as unknown as Node, (n) => {
    if (n.kind === 'on') bindEvent(n as EventBindingNode)
    if (n.kind === 'comparator') void validate(n as ComparatorNode)
  })
}
