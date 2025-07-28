import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type ActionAccessSpecification from "../../Intangible/ActionAccessSpecification/index.ts"
import type Offer from "../../Intangible/Offer/index.ts"

import ConsumeActionComponent from "../../../../../components/Thing/Action/ConsumeAction/index.tsx"

export interface ConsumeActionProps {
	actionAccessibilityRequirement?: ActionAccessSpecification
	expectsAcceptanceOf?: Offer
}

type ConsumeAction =
	& Thing
	& ActionProps
	& ConsumeActionProps

export default ConsumeAction
