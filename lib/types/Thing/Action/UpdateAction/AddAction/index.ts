import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { UpdateActionProps } from "../index.ts"

export interface AddActionProps {
	"@type"?: "AddAction"}

type AddAction = Thing & ActionProps & UpdateActionProps & AddActionProps

export default AddAction
