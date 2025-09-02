import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

export type AcceptActionType = "AcceptAction"

export interface AcceptActionProps {
	"@type"?: AcceptActionType
}

type AcceptAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& AcceptActionProps

export default AcceptAction
