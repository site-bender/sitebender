import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { ConsumeActionProps } from "../../index.ts"
import type { UseActionProps } from "../index.ts"

export type WearActionType = "WearAction"

export interface WearActionProps {
	"@type"?: WearActionType
}

type WearAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& UseActionProps
	& WearActionProps

export default WearAction
