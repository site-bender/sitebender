import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { OrganizeActionProps } from "../index.ts"

export interface AllocateActionProps {
	"@type"?: "AllocateAction"}

type AllocateAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps

export default AllocateAction
