import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { OfferProps } from "../index.ts"

export type OfferForLeaseType = "OfferForLease"

export interface OfferForLeaseProps {
	"@type"?: OfferForLeaseType
}

type OfferForLease = Thing & IntangibleProps & OfferProps & OfferForLeaseProps

export default OfferForLease
