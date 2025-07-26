import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"
import type Person from "../../../Person/index.ts"

export interface WinActionProps {
	loser?: Person
}

type WinAction =
	& Thing
	& ActionProps
	& AchieveActionProps
	& WinActionProps

export default WinAction
