import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { OfferProps } from "../index.ts"

import OfferForPurchaseComponent from "../../../../../../components/Thing/Intangible/Offer/OfferForPurchase/index.tsx"

export interface OfferForPurchaseProps {
}

type OfferForPurchase =
	& Thing
	& IntangibleProps
	& OfferProps
	& OfferForPurchaseProps

export default OfferForPurchase
