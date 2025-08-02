import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export type QuoteActionType = "QuoteAction"

export interface QuoteActionProps {
	"@type"?: QuoteActionType
}

type QuoteAction = Thing & ActionProps & TradeActionProps & QuoteActionProps

export default QuoteAction
