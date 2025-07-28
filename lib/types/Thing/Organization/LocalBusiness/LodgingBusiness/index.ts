import type {
	Boolean,
	DateTime,
	Number,
	Text,
	Time,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type LocationFeatureSpecification from "../../../Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Rating from "../../../Intangible/Rating/index.ts"

import LodgingBusinessComponent from "../../../../../../components/Thing/Organization/LocalBusiness/LodgingBusiness/index.tsx"

export interface LodgingBusinessProps {
	amenityFeature?: LocationFeatureSpecification
	audience?: Audience
	availableLanguage?: Language | Text
	checkinTime?: DateTime | Time
	checkoutTime?: DateTime | Time
	numberOfRooms?: Number | QuantitativeValue
	petsAllowed?: Boolean | Text
	starRating?: Rating
}

type LodgingBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& LodgingBusinessProps

export default LodgingBusiness
