import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

export type DrawActionType = "DrawAction"

export interface DrawActionProps {
	"@type"?: DrawActionType
}

type DrawAction = Thing & ActionProps & CreateActionProps & DrawActionProps

export default DrawAction
