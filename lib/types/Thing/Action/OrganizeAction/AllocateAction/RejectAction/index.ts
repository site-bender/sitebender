// RejectAction extends AllocateAction but adds no additional properties
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RejectActionProps {}

type RejectAction =
	& Thing
	& ActionProps
	& AllocateActionProps
	& OrganizeActionProps
	& RejectActionProps

export default RejectAction
