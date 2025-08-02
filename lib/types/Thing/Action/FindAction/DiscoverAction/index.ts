import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

export type DiscoverActionType = "DiscoverAction"

export interface DiscoverActionProps {
	"@type"?: DiscoverActionType
}

type DiscoverAction =
	& Thing
	& ActionProps
	& FindActionProps
	& DiscoverActionProps

export default DiscoverAction
