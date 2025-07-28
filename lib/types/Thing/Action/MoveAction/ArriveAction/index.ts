import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

export interface ArriveActionProps {}

type ArriveAction = Thing & ActionProps & MoveActionProps & ArriveActionProps

export default ArriveAction
