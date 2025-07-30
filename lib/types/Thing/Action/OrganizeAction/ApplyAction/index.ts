import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

export interface ApplyActionProps {
	"@type"?: "ApplyAction"}

type ApplyAction = Thing & ActionProps & OrganizeActionProps & ApplyActionProps

export default ApplyAction
