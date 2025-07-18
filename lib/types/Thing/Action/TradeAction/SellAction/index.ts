import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type TradeAction from "../index.ts"

export default interface SellAction extends TradeAction {
	/** A sub property of participant. The participant/person/organization that bought the object. */
	buyer?: Organization | Person
	/** The warranty promise(s) included in the offer. */
	warrantyPromise?: WarrantyPromise
}
