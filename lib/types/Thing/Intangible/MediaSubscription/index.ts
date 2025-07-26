import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"
import type Organization from "../../Organization/index.ts"

export interface MediaSubscriptionProps {
	authenticator?: Organization
	expectsAcceptanceOf?: Offer
}

type MediaSubscription =
	& Thing
	& IntangibleProps
	& MediaSubscriptionProps

export default MediaSubscription
