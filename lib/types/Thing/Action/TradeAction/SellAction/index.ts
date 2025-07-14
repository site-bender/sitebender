import WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import TradeAction from "../index.ts"

export default interface SellAction extends TradeAction {
	/** A sub property of participant. The participant/person/organization that bought the object. */
	buyer?: Organization | Person
	/** The warranty promise(s) included in the offer. */
	warrantyPromise?: WarrantyPromise
}
