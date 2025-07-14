import WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import TradeAction from "../index.ts"

export default interface BuyAction extends TradeAction {
	/** An entity which offers (sells / leases / lends / loans) the services / goods.  A seller may also be a provider. */
	seller?: Organization | Person
	/** 'vendor' is an earlier term for 'seller'. */
	vendor?: Person | Organization
	/** The warranty promise(s) included in the offer. */
	warrantyPromise?: WarrantyPromise
}
