import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { PlanActionProps } from "../index.ts"

export interface ReserveActionProps {
	"@type"?: "ReserveAction"}

type ReserveAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& PlanActionProps
	& ReserveActionProps

export default ReserveAction
