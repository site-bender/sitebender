import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { BefriendActionType } from "./BefriendAction/index.ts"
import type { CommunicateActionType } from "./CommunicateAction/index.ts"
import type { FollowActionType } from "./FollowAction/index.ts"
import type { JoinActionType } from "./JoinAction/index.ts"
import type { LeaveActionType } from "./LeaveAction/index.ts"
import type { MarryActionType } from "./MarryAction/index.ts"
import type { RegisterActionType } from "./RegisterAction/index.ts"
import type { SubscribeActionType } from "./SubscribeAction/index.ts"
import type { UnRegisterActionType } from "./UnRegisterAction/index.ts"

export type InteractActionType =
	| "InteractAction"
	| MarryActionType
	| SubscribeActionType
	| BefriendActionType
	| LeaveActionType
	| FollowActionType
	| RegisterActionType
	| UnRegisterActionType
	| JoinActionType
	| CommunicateActionType

export interface InteractActionProps {
	"@type"?: InteractActionType
}

type InteractAction = Thing & ActionProps & InteractActionProps

export default InteractAction
