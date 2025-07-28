import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

export interface PaintActionProps {}

type PaintAction = Thing & ActionProps & CreateActionProps & PaintActionProps

export default PaintAction
