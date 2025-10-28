import type { ComposeContext } from "../../../../src/context/composeContext.ts"
import type { OperatorNode } from "../../../ir/index.ts"

export type OperatorExecutor = (
	node: OperatorNode,
	evaluate: (n: OperatorNode["args"][number]) => Promise<unknown>,
	ctx: ComposeContext,
) => Promise<unknown> | unknown
