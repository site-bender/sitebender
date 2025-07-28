import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

import CheckActionComponent from "../../../../../../components/Thing/Action/FindAction/CheckAction/index.tsx"

export interface CheckActionProps {
}

type CheckAction =
	& Thing
	& ActionProps
	& FindActionProps
	& CheckActionProps

export default CheckAction
