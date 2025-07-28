import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import QuoteActionComponent from "../../../../../../components/Thing/Action/TradeAction/QuoteAction/index.tsx"

export interface QuoteActionProps {
}

type QuoteAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& QuoteActionProps

export default QuoteAction
