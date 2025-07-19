// ConfirmAction extends InformAction but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { InteractActionProps } from "../../../index.ts"
import type { CommunicateActionProps } from "../../index.ts"
import type { InformActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ConfirmActionProps {}

type ConfirmAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InformActionProps
	& InteractActionProps
	& ConfirmActionProps

export default ConfirmAction
