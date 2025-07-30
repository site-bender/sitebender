import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface UseActionProps {
	"@type"?: "UseAction"}

type UseAction = Thing & ActionProps & ConsumeActionProps & UseActionProps

export default UseAction
