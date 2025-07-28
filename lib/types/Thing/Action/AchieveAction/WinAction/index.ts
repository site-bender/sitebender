import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"

import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface WinActionProps {
	loser?: Person | ReturnType<typeof PersonComponent>
}

type WinAction = Thing & ActionProps & AchieveActionProps & WinActionProps

export default WinAction
