import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

import AllocateActionComponent from "../../../../../../components/Thing/Action/OrganizeAction/AllocateAction/index.tsx"

export interface AllocateActionProps {
}

type AllocateAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps

export default AllocateAction
