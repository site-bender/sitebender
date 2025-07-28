import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import PreOrderActionComponent from "../../../../../../components/Thing/Action/TradeAction/PreOrderAction/index.tsx"

export interface PreOrderActionProps {
}

type PreOrderAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& PreOrderActionProps

export default PreOrderAction
