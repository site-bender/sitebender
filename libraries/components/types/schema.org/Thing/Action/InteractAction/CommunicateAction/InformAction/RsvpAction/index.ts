import type { Number } from "../../../../../../DataType/index.ts"
import type Comment from "../../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../../index.ts"
import type RsvpResponseType from "../../../../../Intangible/Enumeration/RsvpResponseType/index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { InteractActionProps } from "../../../index.ts"
import type { CommunicateActionProps } from "../../index.ts"
import type { InformActionProps } from "../index.ts"

import { Comment as CommentComponent } from "../../../../../../../../components/index.tsx"
import { RsvpResponseType as RsvpResponseTypeComponent } from "../../../../../../../../components/index.tsx"

export type RsvpActionType = "RsvpAction"

export interface RsvpActionProps {
	"@type"?: RsvpActionType
	additionalNumberOfGuests?: Number
	comment?: Comment | ReturnType<typeof CommentComponent>
	rsvpResponse?:
		| RsvpResponseType
		| ReturnType<typeof RsvpResponseTypeComponent>
}

type RsvpAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InformActionProps
	& RsvpActionProps

export default RsvpAction
