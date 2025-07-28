import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

export interface CheckActionProps {}

type CheckAction = Thing & ActionProps & FindActionProps & CheckActionProps

export default CheckAction
