import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

export interface WantActionProps {
}

type WantAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& WantActionProps

export default WantAction
