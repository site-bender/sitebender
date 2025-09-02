import type { ComposeContext } from "../../../../src/context/composeContext.ts"
import type { EventBindingNode } from "../../../ir/index.ts"

export type EventBinder = (
	el: HTMLElement,
	node: EventBindingNode,
	dispatch: () => void,
	ctx: ComposeContext,
) => void
