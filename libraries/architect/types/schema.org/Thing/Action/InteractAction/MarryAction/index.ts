import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export type MarryActionType = "MarryAction"

export interface MarryActionProps {
	"@type"?: MarryActionType
}

type MarryAction = Thing & ActionProps & InteractActionProps & MarryActionProps

export default MarryAction
