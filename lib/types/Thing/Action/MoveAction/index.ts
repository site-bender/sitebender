import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type { ActionProps } from "../index.ts"

export interface MoveActionProps {
	/** A sub property of location. The original location of the object or the agent before the action. */
	fromLocation?: Place
	/** A sub property of location. The final location of the object or the agent after the action. */
	toLocation?: Place
}

type MoveAction =
	& Thing
	& ActionProps
	& MoveActionProps

export default MoveAction
