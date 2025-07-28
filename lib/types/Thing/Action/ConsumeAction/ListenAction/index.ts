import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface ListenActionProps {}

type ListenAction = Thing & ActionProps & ConsumeActionProps & ListenActionProps

export default ListenAction
