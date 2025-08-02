import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { LoseActionType } from "./LoseAction/index.ts"
import type { TieActionType } from "./TieAction/index.ts"
import type { WinActionType } from "./WinAction/index.ts"

export type AchieveActionType =
	| "AchieveAction"
	| LoseActionType
	| TieActionType
	| WinActionType

export interface AchieveActionProps {
	"@type"?: AchieveActionType
}

type AchieveAction = Thing & ActionProps & AchieveActionProps

export default AchieveAction
