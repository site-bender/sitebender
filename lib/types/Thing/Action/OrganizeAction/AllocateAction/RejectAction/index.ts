import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

import RejectActionComponent from "../../../../../../../components/Thing/Action/OrganizeAction/AllocateAction/RejectAction/index.tsx"

export interface RejectActionProps {
}

type RejectAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& RejectActionProps

export default RejectAction
