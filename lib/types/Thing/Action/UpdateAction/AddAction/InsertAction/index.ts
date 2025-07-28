import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { UpdateActionProps } from "../../index.ts"
import type { AddActionProps } from "../index.ts"
import type Place from "../../../../Place/index.ts"

import InsertActionComponent from "../../../../../../../components/Thing/Action/UpdateAction/AddAction/InsertAction/index.tsx"

export interface InsertActionProps {
	toLocation?: Place
}

type InsertAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps

export default InsertAction
