import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"

export interface SellActionProps {
	buyer?: Organization | Person
	warrantyPromise?: WarrantyPromise
}

type SellAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& SellActionProps

export default SellAction
