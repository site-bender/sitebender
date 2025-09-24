import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

export type AgreeActionType = "AgreeAction"

export interface AgreeActionProps {
	"@type"?: AgreeActionType
}

type AgreeAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& AgreeActionProps

export default AgreeAction
