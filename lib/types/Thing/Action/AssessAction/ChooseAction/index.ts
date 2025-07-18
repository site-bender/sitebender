import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type AssessAction from "../index.ts"

export default interface ChooseAction extends AssessAction {
	/** A sub property of object. The options subject to this action. */
	actionOption?: Thing | Text
	/** A sub property of object. The options subject to this action. */
	option?: Text | Thing
}
