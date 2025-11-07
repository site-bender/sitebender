import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

import OrganizationComponent from "../../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../architect/src/define/Thing/Person/index.tsx"

export type FollowActionType = "FollowAction"

export interface FollowActionProps {
	"@type"?: FollowActionType
	followee?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type FollowAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& FollowActionProps

export default FollowAction
