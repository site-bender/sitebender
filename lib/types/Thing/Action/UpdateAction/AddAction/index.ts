import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

import AddActionComponent from "../../../../../../components/Thing/Action/UpdateAction/AddAction/index.tsx"

export interface AddActionProps {
}

type AddAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps

export default AddAction
