import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { PlanActionProps } from "../index.ts"

import ReserveActionComponent from "../../../../../../../components/Thing/Action/OrganizeAction/PlanAction/ReserveAction/index.tsx"

export interface ReserveActionProps {
}

type ReserveAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& PlanActionProps
	& ReserveActionProps

export default ReserveAction
