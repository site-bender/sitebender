import type { ComposeContext } from "../../../../src/context/composeContext.ts"
import type { InjectorNode } from "../../../ir/index.ts"

export type InjectorExecutor = (
	node: InjectorNode,
	ctx: ComposeContext,
) => Promise<unknown> | unknown
