import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"

import BuyActionComponent from "../../../../../../components/Thing/Action/TradeAction/BuyAction/index.tsx"

export interface BuyActionProps {
	seller?: Organization | Person
	vendor?: Organization | Person
	warrantyPromise?: WarrantyPromise
}

type BuyAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& BuyActionProps

export default BuyAction
