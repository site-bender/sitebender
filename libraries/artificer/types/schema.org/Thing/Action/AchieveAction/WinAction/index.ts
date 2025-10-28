import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"

import PersonComponent from "../../../../../../../pagewright/src/define/Thing/Person/index.tsx"

export type WinActionType = "WinAction"

export interface WinActionProps {
	"@type"?: WinActionType
	loser?: Person | ReturnType<typeof PersonComponent>
}

type WinAction = Thing & ActionProps & AchieveActionProps & WinActionProps

export default WinAction
