import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface EatActionProps {}

type EatAction = Thing & ActionProps & ConsumeActionProps & EatActionProps

export default EatAction
