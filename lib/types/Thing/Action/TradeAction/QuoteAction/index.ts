// QuoteAction extends TradeAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface QuoteActionProps {}

type QuoteAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& QuoteActionProps

export default QuoteAction
