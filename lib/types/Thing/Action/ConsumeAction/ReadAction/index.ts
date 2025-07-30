import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface ReadActionProps {
	"@type"?: "ReadAction"}

type ReadAction = Thing & ActionProps & ConsumeActionProps & ReadActionProps

export default ReadAction
