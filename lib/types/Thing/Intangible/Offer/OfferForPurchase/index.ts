import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { OfferProps } from "../index.ts"

export interface OfferForPurchaseProps {}

type OfferForPurchase =
	& Thing
	& IntangibleProps
	& OfferProps
	& OfferForPurchaseProps

export default OfferForPurchase
