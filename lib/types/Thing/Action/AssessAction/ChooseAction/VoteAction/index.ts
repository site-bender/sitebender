import type Thing from "../../../../index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ChooseActionProps } from "../index.ts"

import PersonComponent from "../../../../../../components/Thing/Person/index.ts"

export interface VoteActionProps {
	"@type"?: "VoteAction"
	candidate?: Person | ReturnType<typeof PersonComponent>
}

type VoteAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ChooseActionProps
	& VoteActionProps

export default VoteAction
