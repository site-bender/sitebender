// OfferForLease extends Offer but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { OfferProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface OfferForLeaseProps {}

type OfferForLease =
	& Thing
	& IntangibleProps
	& OfferProps
	& OfferForLeaseProps

export default OfferForLease
