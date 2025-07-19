// ArriveAction extends MoveAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ArriveActionProps {}

type ArriveAction =
	& Thing
	& ActionProps
	& MoveActionProps
	& ArriveActionProps

export default ArriveAction
