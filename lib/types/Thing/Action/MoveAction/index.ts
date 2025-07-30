import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type { ActionProps } from "../index.ts"

import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface MoveActionProps {
	"@type"?: "MoveAction"
	fromLocation?: Place | ReturnType<typeof PlaceComponent>
	toLocation?: Place | ReturnType<typeof PlaceComponent>
}

type MoveAction = Thing & ActionProps & MoveActionProps

export default MoveAction
