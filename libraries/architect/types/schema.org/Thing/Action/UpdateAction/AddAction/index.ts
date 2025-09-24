import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"
import type { InsertActionType } from "./InsertAction/index.ts"

export type AddActionType = "AddAction" | InsertActionType

export interface AddActionProps {
	"@type"?: AddActionType
}

type AddAction = Thing & ActionProps & UpdateActionProps & AddActionProps

export default AddAction
