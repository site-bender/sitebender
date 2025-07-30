import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { CreateActionProps } from "../index.ts"

export interface PhotographActionProps {
	"@type"?: "PhotographAction"}

type PhotographAction =
	& Thing
	& ActionProps
	& CreateActionProps
	& PhotographActionProps

export default PhotographAction
