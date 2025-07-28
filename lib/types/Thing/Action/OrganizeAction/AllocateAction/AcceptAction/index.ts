import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

import AcceptActionComponent from "../../../../../../../components/Thing/Action/OrganizeAction/AllocateAction/AcceptAction/index.tsx"

export interface AcceptActionProps {
}

type AcceptAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& AcceptActionProps

export default AcceptAction
