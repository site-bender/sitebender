import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { InteractActionProps } from "../index.ts"

export interface MarryActionProps {
}

type MarryAction =
	& Thing
	& ActionProps
	& InteractActionProps
	& MarryActionProps

export default MarryAction
