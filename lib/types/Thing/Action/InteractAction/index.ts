import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

export interface InteractActionProps {
}

type InteractAction =
	& Thing
	& ActionProps
	& InteractActionProps

export default InteractAction
