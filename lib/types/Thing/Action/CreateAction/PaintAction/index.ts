// PaintAction extends CreateAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PaintActionProps {}

type PaintAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& PaintActionProps

export default PaintAction
