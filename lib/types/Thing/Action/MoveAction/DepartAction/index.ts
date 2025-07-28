import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

export interface DepartActionProps {}

type DepartAction = Thing & ActionProps & MoveActionProps & DepartActionProps

export default DepartAction
