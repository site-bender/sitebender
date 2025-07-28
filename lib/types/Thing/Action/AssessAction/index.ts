import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import AssessActionComponent from "../../../../../components/Thing/Action/AssessAction/index.tsx"

export interface AssessActionProps {
}

type AssessAction =
	& Thing
	& ActionProps
	& AssessActionProps

export default AssessAction
