import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { InteractActionProps } from "../../index.ts"
import type { CommunicateActionProps } from "../index.ts"

import ShareActionComponent from "../../../../../../../components/Thing/Action/InteractAction/CommunicateAction/ShareAction/index.tsx"

export interface ShareActionProps {
}

type ShareAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& ShareActionProps

export default ShareAction
