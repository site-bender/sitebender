import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

export interface ChooseActionProps {
	/** A sub property of object. The options subject to this action. */
	actionOption?: Thing | Text
	/** A sub property of object. The options subject to this action. */
	option?: Text | Thing
}

type ChooseAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ChooseActionProps

export default ChooseAction
