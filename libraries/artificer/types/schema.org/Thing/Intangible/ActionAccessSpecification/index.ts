import type {
	Boolean,
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MediaSubscription from "../MediaSubscription/index.ts"
import type Offer from "../Offer/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"

import ThingComponent from "../../../../../../architect/src/define/Thing/index.tsx"
import CategoryCodeComponent from "../../../../../../architect/src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import PhysicalActivityCategoryComponent from "../../../../../../architect/src/define/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.tsx"
import MediaSubscriptionComponent from "../../../../../../architect/src/define/Thing/Intangible/MediaSubscription/index.tsx"
import OfferComponent from "../../../../../../architect/src/define/Thing/Intangible/Offer/index.tsx"
import GeoShapeComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/GeoShape/index.tsx"
import PlaceComponent from "../../../../../../architect/src/define/Thing/Place/index.tsx"

export type ActionAccessSpecificationType = "ActionAccessSpecification"

export interface ActionAccessSpecificationProps {
	"@type"?: ActionAccessSpecificationType
	availabilityEnds?: Date | DateTime | Time
	availabilityStarts?: Date | DateTime | Time
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	eligibleRegion?:
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	expectsAcceptanceOf?: Offer | ReturnType<typeof OfferComponent>
	ineligibleRegion?:
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	requiresSubscription?:
		| Boolean
		| MediaSubscription
		| ReturnType<typeof MediaSubscriptionComponent>
}

type ActionAccessSpecification =
	& Thing
	& IntangibleProps
	& ActionAccessSpecificationProps

export default ActionAccessSpecification
