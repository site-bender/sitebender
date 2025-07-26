import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

export interface FollowActionProps {
	followee?: Organization | Person
}

type FollowAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& FollowActionProps

export default FollowAction
