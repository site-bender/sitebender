import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import OrganizeActionComponent from "../../../../../components/Thing/Action/OrganizeAction/index.tsx"

export interface OrganizeActionProps {
}

type OrganizeAction =
	& Thing
	& ActionProps
	& OrganizeActionProps

export default OrganizeAction
