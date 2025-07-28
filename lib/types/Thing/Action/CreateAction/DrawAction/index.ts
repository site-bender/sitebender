import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

import DrawActionComponent from "../../../../../../components/Thing/Action/CreateAction/DrawAction/index.tsx"

export interface DrawActionProps {
}

type DrawAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& DrawActionProps

export default DrawAction
