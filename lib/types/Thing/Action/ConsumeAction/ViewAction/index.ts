// ViewAction extends ConsumeAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ViewActionProps {}

type ViewAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& ViewActionProps

export default ViewAction
