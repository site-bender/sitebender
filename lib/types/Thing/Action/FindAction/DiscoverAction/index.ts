import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

export interface DiscoverActionProps {
	"@type"?: "DiscoverAction"}

type DiscoverAction =
	& Thing
	& ActionProps
	& FindActionProps
	& DiscoverActionProps

export default DiscoverAction
