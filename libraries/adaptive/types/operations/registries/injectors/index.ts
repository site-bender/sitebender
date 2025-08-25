import type { ComposeContext } from "../../../../context/composeContext.ts"
import type { InjectorNode } from "../../../ir/index.ts"

export type InjectorExecutor = (
	node: InjectorNode,
	ctx: ComposeContext,
) => Promise<unknown> | unknown
