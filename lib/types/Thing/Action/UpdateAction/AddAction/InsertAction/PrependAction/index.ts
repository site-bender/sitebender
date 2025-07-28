import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { UpdateActionProps } from "../../../index.ts"
import type { AddActionProps } from "../../index.ts"
import type { InsertActionProps } from "../index.ts"

export interface PrependActionProps {}

type PrependAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& AddActionProps
	& InsertActionProps
	& PrependActionProps

export default PrependAction
