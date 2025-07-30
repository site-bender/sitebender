import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export interface PreOrderActionProps {
	"@type"?: "PreOrderAction"}

type PreOrderAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& PreOrderActionProps

export default PreOrderAction
