import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export type SolveMathActionType = "SolveMathAction"

export interface SolveMathActionProps {
	"@type"?: SolveMathActionType
	eduQuestionType?: Text
}

type SolveMathAction = Thing & ActionProps & SolveMathActionProps

export default SolveMathAction
