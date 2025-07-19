// ShareAction extends CommunicateAction but adds no additional properties
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ShareActionProps {}

type ShareAction =
	& Thing
	& ActionProps
	& CommunicateActionProps
	& InteractActionProps
	& ShareActionProps

export default ShareAction
