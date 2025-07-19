// AllocateAction extends OrganizeAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AllocateActionProps {}

type AllocateAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps

export default AllocateAction
