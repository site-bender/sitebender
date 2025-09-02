import type { Date, DateTime, Text, URL } from "../../../../DataType/index.ts"
import type CreativeWork from "../../../CreativeWork/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

import { CreativeWork as CreativeWorkComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"

export type UserCommentsType = "UserComments"

export interface UserCommentsProps {
	"@type"?: UserCommentsType
	commentText?: Text
	commentTime?: Date | DateTime
	creator?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	discusses?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	replyToUrl?: URL
}

type UserComments =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserCommentsProps

export default UserComments
