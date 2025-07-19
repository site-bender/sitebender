// DeleteAction extends UpdateAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DeleteActionProps {}

type DeleteAction =
	& Thing
	& ActionProps
	& UpdateActionProps
	& DeleteActionProps

export default DeleteAction
