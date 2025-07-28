import type { Number } from "../../../../../../DataType/index.ts"
import type Comment from "../../../../../CreativeWork/Comment/index.ts"
import type Thing from "../../../../../index.ts"
import type RsvpResponseType from "../../../../../Intangible/Enumeration/RsvpResponseType/index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { InteractActionProps } from "../../../index.ts"
import type { CommunicateActionProps } from "../../index.ts"
import type { InformActionProps } from "../index.ts"

import CommentComponent from "../../../../../../../components/Thing/CreativeWork/Comment/index.ts"
import RsvpResponseTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/RsvpResponseType/index.ts"

export interface RsvpActionProps {
	additionalNumberOfGuests?: Number
	comment?: Comment | ReturnType<typeof CommentComponent>
	rsvpResponse?: RsvpResponseType | ReturnType<typeof RsvpResponseTypeComponent>
}

type RsvpAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& CommunicateActionProps
	& InformActionProps
	& RsvpActionProps

export default RsvpAction
