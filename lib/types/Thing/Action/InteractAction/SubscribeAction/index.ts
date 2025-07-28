import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import SubscribeActionComponent from "../../../../../../components/Thing/Action/InteractAction/SubscribeAction/index.tsx"

export interface SubscribeActionProps {
}

type SubscribeAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& SubscribeActionProps

export default SubscribeAction
