import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"
import type { WearActionType } from "./WearAction/index.ts"

export type UseActionType = "UseAction" | WearActionType

export interface UseActionProps {
	"@type"?: UseActionType
}

type UseAction = Thing & ActionProps & ConsumeActionProps & UseActionProps

export default UseAction
