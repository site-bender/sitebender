import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import UpdateActionComponent from "../../../../../components/Thing/Action/UpdateAction/index.tsx"

export interface UpdateActionProps {
	collection?: Thing
	targetCollection?: Thing
}

type UpdateAction =
	& Thing
	& ActionProps
	& UpdateActionProps

export default UpdateAction
