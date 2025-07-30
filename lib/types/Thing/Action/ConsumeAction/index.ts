import type Thing from "../../index.ts"
import type ActionAccessSpecification from "../../Intangible/ActionAccessSpecification/index.ts"
import type Offer from "../../Intangible/Offer/index.ts"
import type { ActionProps } from "../index.ts"

import ActionAccessSpecificationComponent from "../../../../components/Thing/Intangible/ActionAccessSpecification/index.ts"
import OfferComponent from "../../../../components/Thing/Intangible/Offer/index.ts"

export interface ConsumeActionProps {
	"@type"?: "ConsumeAction"
	actionAccessibilityRequirement?:
		| ActionAccessSpecification
		| ReturnType<typeof ActionAccessSpecificationComponent>
	expectsAcceptanceOf?: Offer | ReturnType<typeof OfferComponent>
}

type ConsumeAction = Thing & ActionProps & ConsumeActionProps

export default ConsumeAction
