import type { Date, DateTime, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

export interface UserCommentsProps {
	commentText?: Text
	commentTime?: Date | DateTime
	creator?: Organization | Person
	discusses?: CreativeWork
	replyToUrl?: URL
}

type UserComments =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserCommentsProps

export default UserComments
