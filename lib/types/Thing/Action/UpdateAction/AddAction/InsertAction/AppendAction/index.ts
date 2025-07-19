// AppendAction extends InsertAction but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { ActionProps } from "../../../../index.ts"
import type { UpdateActionProps } from "../../../index.ts"
import type { AddActionProps } from "../../index.ts"
import type { InsertActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AppendActionProps {}

type AppendAction =
	& Thing
	& ActionProps
	& AddActionProps
	& InsertActionProps
	& UpdateActionProps
	& AppendActionProps

export default AppendAction
