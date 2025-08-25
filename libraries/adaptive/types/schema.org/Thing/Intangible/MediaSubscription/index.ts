import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Offer from "../Offer/index.ts"

import { Offer as OfferComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"

export type MediaSubscriptionType = "MediaSubscription"

export interface MediaSubscriptionProps {
	"@type"?: MediaSubscriptionType
	authenticator?: Organization | ReturnType<typeof OrganizationComponent>
	expectsAcceptanceOf?: Offer | ReturnType<typeof OfferComponent>
}

type MediaSubscription = Thing & IntangibleProps & MediaSubscriptionProps

export default MediaSubscription
