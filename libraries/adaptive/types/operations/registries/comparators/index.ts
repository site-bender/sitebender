import type { ComposeContext } from "../../../../context/composeContext.ts"
import type { ComparatorNode } from "../../../ir/index.ts"

export type ComparatorExecutor = (
	node: ComparatorNode,
	evaluate: (n: ComparatorNode["args"][number]) => Promise<unknown>,
	ctx: ComposeContext,
) => Promise<boolean> | boolean
