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

import ThingComponent from "../../../../components/Thing/index.ts"
import CategoryCodeComponent from "../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import PhysicalActivityCategoryComponent from "../../../../components/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import MediaSubscriptionComponent from "../../../../components/Thing/Intangible/MediaSubscription/index.ts"
import OfferComponent from "../../../../components/Thing/Intangible/Offer/index.ts"
import GeoShapeComponent from "../../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface ActionAccessSpecificationProps {
	"@type"?: "ActionAccessSpecification"
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
