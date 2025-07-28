import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

import ChooseActionComponent from "../../../../../../components/Thing/Action/AssessAction/ChooseAction/index.tsx"

export interface ChooseActionProps {
	actionOption?: Text | Thing
	option?: Text | Thing
}

type ChooseAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ChooseActionProps

export default ChooseAction
