import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

import IgnoreActionComponent from "../../../../../../components/Thing/Action/AssessAction/IgnoreAction/index.tsx"

export interface IgnoreActionProps {
}

type IgnoreAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& IgnoreActionProps

export default IgnoreAction
