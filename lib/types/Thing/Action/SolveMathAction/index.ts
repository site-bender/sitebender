import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface SolveMathActionProps {
	eduQuestionType?: Text
}

type SolveMathAction = Thing & ActionProps & SolveMathActionProps

export default SolveMathAction
