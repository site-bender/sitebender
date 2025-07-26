import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

export interface DisagreeActionProps {
}

type DisagreeAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& DisagreeActionProps

export default DisagreeAction
