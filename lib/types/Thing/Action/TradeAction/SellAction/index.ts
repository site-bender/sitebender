import type Thing from "../../../index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export interface SellActionProps {
	/** A sub property of participant. The participant/person/organization that bought the object. */
	buyer?: Organization | Person
	/** The warranty promise(s) included in the offer. */
	warrantyPromise?: WarrantyPromise
}

type SellAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& SellActionProps

export default SellAction
