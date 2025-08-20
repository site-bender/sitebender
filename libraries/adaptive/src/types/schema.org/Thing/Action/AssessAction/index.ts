import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type { ChooseActionType } from "./ChooseAction/index.ts"
import type { IgnoreActionType } from "./IgnoreAction/index.ts"
import type { ReactActionType } from "./ReactAction/index.ts"
import type { ReviewActionType } from "./ReviewAction/index.ts"

export type AssessActionType =
	| "AssessAction"
	| ReactActionType
	| IgnoreActionType
	| ChooseActionType
	| ReviewActionType

export interface AssessActionProps {
	"@type"?: AssessActionType
}

type AssessAction = Thing & ActionProps & AssessActionProps

export default AssessAction
