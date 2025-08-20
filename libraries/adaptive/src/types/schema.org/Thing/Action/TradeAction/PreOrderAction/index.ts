import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export type PreOrderActionType = "PreOrderAction"

export interface PreOrderActionProps {
	"@type"?: PreOrderActionType
}

type PreOrderAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& PreOrderActionProps

export default PreOrderAction
