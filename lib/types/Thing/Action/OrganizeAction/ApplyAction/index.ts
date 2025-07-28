import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

import ApplyActionComponent from "../../../../../../components/Thing/Action/OrganizeAction/ApplyAction/index.tsx"

export interface ApplyActionProps {
}

type ApplyAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& ApplyActionProps

export default ApplyAction
