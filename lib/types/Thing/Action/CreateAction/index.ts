import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import CreateActionComponent from "../../../../../components/Thing/Action/CreateAction/index.tsx"

export interface CreateActionProps {
}

type CreateAction =
	& Thing
	& ActionProps
	& CreateActionProps

export default CreateAction
