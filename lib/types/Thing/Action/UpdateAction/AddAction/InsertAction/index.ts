import type Thing from "../../../../index.ts"
import type Place from "../../../../Place/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { UpdateActionProps } from "../../index.ts"
import type { AddActionProps } from "../index.ts"

import PlaceComponent from "../../../../../../components/Thing/Place/index.ts"

export interface InsertActionProps {
	"@type"?: "InsertAction"
	toLocation?: Place | ReturnType<typeof PlaceComponent>
}

type InsertAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps

export default InsertAction
