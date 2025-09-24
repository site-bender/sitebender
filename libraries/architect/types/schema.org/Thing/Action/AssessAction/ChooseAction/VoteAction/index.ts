import type Thing from "../../../../index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ChooseActionProps } from "../index.ts"

import PersonComponent from "../../../../../../../../codewright/src/define/Thing/Person/index.tsx"

export type VoteActionType = "VoteAction"

export interface VoteActionProps {
	"@type"?: VoteActionType
	candidate?: Person | ReturnType<typeof PersonComponent>
}

type VoteAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ChooseActionProps
	& VoteActionProps

export default VoteAction
