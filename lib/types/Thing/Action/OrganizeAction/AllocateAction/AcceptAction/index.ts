import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

export interface AcceptActionProps {
}

type AcceptAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& AcceptActionProps

export default AcceptAction
