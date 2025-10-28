import type { ComposeContext } from "../../../../src/context/composeContext.ts"
import type { ActionNode } from "../../../ir/index.ts"

export type ActionExecutor = (
	node: ActionNode,
	evaluate: (n: ActionNode["args"][number]) => Promise<unknown>,
	ctx: ComposeContext,
	event?: Event,
) => Promise<void> | void
