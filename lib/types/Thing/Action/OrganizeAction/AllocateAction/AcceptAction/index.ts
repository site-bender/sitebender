// AcceptAction extends AllocateAction but adds no additional properties
import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AcceptActionProps {}

type AcceptAction =
	& Thing
	& ActionProps
	& AllocateActionProps
	& OrganizeActionProps
	& AcceptActionProps

export default AcceptAction
