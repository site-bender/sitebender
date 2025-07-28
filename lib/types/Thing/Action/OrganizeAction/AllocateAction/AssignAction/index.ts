import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

import AssignActionComponent from "../../../../../../../components/Thing/Action/OrganizeAction/AllocateAction/AssignAction/index.tsx"

export interface AssignActionProps {
}

type AssignAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& AssignActionProps

export default AssignAction
