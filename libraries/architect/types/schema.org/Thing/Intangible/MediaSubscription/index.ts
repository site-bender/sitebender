import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"

import OfferComponent from "../../../../../src/define/Thing/Intangible/Offer/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"

export type MediaSubscriptionType = "MediaSubscription"

export interface MediaSubscriptionProps {
	"@type"?: MediaSubscriptionType
	authenticator?: Organization | ReturnType<typeof OrganizationComponent>
	expectsAcceptanceOf?: Offer | ReturnType<typeof OfferComponent>
}

type MediaSubscription = Thing & IntangibleProps & MediaSubscriptionProps

export default MediaSubscription
