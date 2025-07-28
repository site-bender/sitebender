import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export interface QuoteActionProps {}

type QuoteAction = Thing & ActionProps & TradeActionProps & QuoteActionProps

export default QuoteAction
