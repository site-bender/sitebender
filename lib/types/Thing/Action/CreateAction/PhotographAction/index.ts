import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

import PhotographActionComponent from "../../../../../../components/Thing/Action/CreateAction/PhotographAction/index.tsx"

export interface PhotographActionProps {
}

type PhotographAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& PhotographActionProps

export default PhotographAction
