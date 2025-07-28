import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

import PaintActionComponent from "../../../../../../components/Thing/Action/CreateAction/PaintAction/index.tsx"

export interface PaintActionProps {
}

type PaintAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& PaintActionProps

export default PaintAction
