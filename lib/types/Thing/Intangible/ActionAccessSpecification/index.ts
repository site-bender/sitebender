import type {
	Boolean,
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type MediaSubscription from "../MediaSubscription/index.ts"
import type Offer from "../Offer/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type Place from "../../Place/index.ts"

import ActionAccessSpecificationComponent from "../../../../../components/Thing/Intangible/ActionAccessSpecification/index.tsx"

export interface ActionAccessSpecificationProps {
	availabilityEnds?: Date | DateTime | Time
	availabilityStarts?: Date | DateTime | Time
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	eligibleRegion?: GeoShape | Place | Text
	expectsAcceptanceOf?: Offer
	ineligibleRegion?: GeoShape | Place | Text
	requiresSubscription?: Boolean | MediaSubscription
}

type ActionAccessSpecification =
	& Thing
	& IntangibleProps
	& ActionAccessSpecificationProps

export default ActionAccessSpecification
