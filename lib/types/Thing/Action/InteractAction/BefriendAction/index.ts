import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export interface BefriendActionProps {
}

type BefriendAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& BefriendActionProps

export default BefriendAction
