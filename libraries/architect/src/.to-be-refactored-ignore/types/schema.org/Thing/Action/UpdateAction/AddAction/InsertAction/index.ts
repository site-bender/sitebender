import type Thing from "../../../../index.ts"
import type Place from "../../../../Place/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { UpdateActionProps } from "../../index.ts"
import type { AddActionProps } from "../index.ts"
import type { AppendActionType } from "./AppendAction/index.ts"
import type { PrependActionType } from "./PrependAction/index.ts"

import PlaceComponent from "../../../../../../../src/define/Thing/Place/index.tsx"

export type InsertActionType =
	| "InsertAction"
	| AppendActionType
	| PrependActionType

export interface InsertActionProps {
	"@type"?: InsertActionType
	toLocation?: Place | ReturnType<typeof PlaceComponent>
}

type InsertAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps

export default InsertAction
