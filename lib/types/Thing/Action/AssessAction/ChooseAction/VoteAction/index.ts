import type Thing from "../../../../index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ChooseActionProps } from "../index.ts"

export interface VoteActionProps {
	/** A sub property of object. The candidate subject of this action. */
	candidate?: Person
}

type VoteAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ChooseActionProps
	& VoteActionProps

export default VoteAction
