import type Thing from "../../../index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export interface BuyActionProps {
	/** An entity which offers (sells / leases / lends / loans) the services / goods.  A seller may also be a provider. */
	seller?: Organization | Person
	/** 'vendor' is an earlier term for 'seller'. */
	vendor?: Person | Organization
	/** The warranty promise(s) included in the offer. */
	warrantyPromise?: WarrantyPromise
}

type BuyAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& BuyActionProps

export default BuyAction
