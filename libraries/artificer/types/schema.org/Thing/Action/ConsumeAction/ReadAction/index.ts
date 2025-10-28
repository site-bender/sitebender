import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export type ReadActionType = "ReadAction"

export interface ReadActionProps {
	"@type"?: ReadActionType
}

type ReadAction = Thing & ActionProps & ConsumeActionProps & ReadActionProps

export default ReadAction
