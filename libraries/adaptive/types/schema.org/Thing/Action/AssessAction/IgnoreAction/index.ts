import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

export type IgnoreActionType = "IgnoreAction"

export interface IgnoreActionProps {
	"@type"?: IgnoreActionType
}

type IgnoreAction = Thing & ActionProps & AssessActionProps & IgnoreActionProps

export default IgnoreAction
