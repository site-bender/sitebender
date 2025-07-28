import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { PlanActionProps } from "../index.ts"

import CancelActionComponent from "../../../../../../../components/Thing/Action/OrganizeAction/PlanAction/CancelAction/index.tsx"

export interface CancelActionProps {
}

type CancelAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& PlanActionProps
	& CancelActionProps

export default CancelAction
