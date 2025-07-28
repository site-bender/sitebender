import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

import DeleteActionComponent from "../../../../../../components/Thing/Action/UpdateAction/DeleteAction/index.tsx"

export interface DeleteActionProps {
}

type DeleteAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& DeleteActionProps

export default DeleteAction
