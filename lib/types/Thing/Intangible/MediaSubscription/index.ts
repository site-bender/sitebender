import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"

export interface MediaSubscriptionProps {
	/** The Organization responsible for authenticating the user's subscription. For example, many media apps require a cable/satellite provider to authenticate your subscription before playing media. */
	authenticator?: Organization
	/** An Offer which must be accepted before the user can perform the Action. For example, the user may need to buy a movie before being able to watch it. */
	expectsAcceptanceOf?: Offer
}

type MediaSubscription =
	& Thing
	& IntangibleProps
	& MediaSubscriptionProps

export default MediaSubscription
