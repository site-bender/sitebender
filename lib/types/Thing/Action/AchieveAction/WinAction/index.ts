import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"
import type Person from "../../../Person/index.ts"

import WinActionComponent from "../../../../../../components/Thing/Action/AchieveAction/WinAction/index.tsx"

export interface WinActionProps {
	loser?: Person
}

type WinAction =
	& Thing
	& ActionProps
	& AchieveActionProps
	& WinActionProps

export default WinAction
