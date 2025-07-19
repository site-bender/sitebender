import type Thing from "../../../../index.ts"
import type Place from "../../../../Place/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { UpdateActionProps } from "../../index.ts"
import type { AddActionProps } from "../index.ts"

export interface InsertActionProps {
	/** A sub property of location. The final location of the object or the agent after the action. */
	toLocation?: Place
}

type InsertAction =
	& Thing
	& ActionProps
	& AddActionProps
	& UpdateActionProps
	& InsertActionProps

export default InsertAction
