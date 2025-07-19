// DepartAction extends MoveAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DepartActionProps {}

type DepartAction =
	& Thing
	& ActionProps
	& MoveActionProps
	& DepartActionProps

export default DepartAction
