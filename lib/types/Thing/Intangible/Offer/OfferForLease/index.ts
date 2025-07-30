import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { OfferProps } from "../index.ts"

export interface OfferForLeaseProps {
	"@type"?: "OfferForLease"}

type OfferForLease = Thing & IntangibleProps & OfferProps & OfferForLeaseProps

export default OfferForLease
