import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { OfferProps } from "../index.ts"

import OfferForLeaseComponent from "../../../../../../components/Thing/Intangible/Offer/OfferForLease/index.tsx"

export interface OfferForLeaseProps {
}

type OfferForLease =
	& Thing
	& IntangibleProps
	& OfferProps
	& OfferForLeaseProps

export default OfferForLease
