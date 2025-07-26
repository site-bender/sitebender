import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type Place from "../../Place/index.ts"

export interface MoveActionProps {
	fromLocation?: Place
	toLocation?: Place
}

type MoveAction =
	& Thing
	& ActionProps
	& MoveActionProps

export default MoveAction
