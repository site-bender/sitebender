import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import BefriendActionComponent from "../../../../../../components/Thing/Action/InteractAction/BefriendAction/index.tsx"

export interface BefriendActionProps {
}

type BefriendAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& BefriendActionProps

export default BefriendAction
