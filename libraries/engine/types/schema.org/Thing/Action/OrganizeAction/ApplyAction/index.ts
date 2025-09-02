import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

export type ApplyActionType = "ApplyAction"

export interface ApplyActionProps {
	"@type"?: ApplyActionType
}

type ApplyAction = Thing & ActionProps & OrganizeActionProps & ApplyActionProps

export default ApplyAction
