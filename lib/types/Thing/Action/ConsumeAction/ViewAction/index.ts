import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface ViewActionProps {}

type ViewAction = Thing & ActionProps & ConsumeActionProps & ViewActionProps

export default ViewAction
