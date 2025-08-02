import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

export type DepartActionType = "DepartAction"

export interface DepartActionProps {
	"@type"?: DepartActionType
}

type DepartAction = Thing & ActionProps & MoveActionProps & DepartActionProps

export default DepartAction
