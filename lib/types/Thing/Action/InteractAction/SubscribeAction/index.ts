import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export interface SubscribeActionProps {
	"@type"?: "SubscribeAction"}

type SubscribeAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& SubscribeActionProps

export default SubscribeAction
