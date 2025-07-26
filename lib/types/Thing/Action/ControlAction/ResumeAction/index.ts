import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ControlActionProps } from "../index.ts"

export interface ResumeActionProps {
}

type ResumeAction =
	& Thing
	& ActionProps
	& ControlActionProps
	& ResumeActionProps

export default ResumeAction
