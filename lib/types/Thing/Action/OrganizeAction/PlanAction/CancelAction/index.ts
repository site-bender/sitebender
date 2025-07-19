// CancelAction extends PlanAction but adds no additional properties
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { PlanActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CancelActionProps {}

type CancelAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& PlanActionProps
	& CancelActionProps

export default CancelAction
