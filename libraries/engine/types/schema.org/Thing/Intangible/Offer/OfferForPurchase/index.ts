import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { OfferProps } from "../index.ts"

export type OfferForPurchaseType = "OfferForPurchase"

export interface OfferForPurchaseProps {
	"@type"?: OfferForPurchaseType
}

type OfferForPurchase =
	& Thing
	& IntangibleProps
	& OfferProps
	& OfferForPurchaseProps

export default OfferForPurchase
