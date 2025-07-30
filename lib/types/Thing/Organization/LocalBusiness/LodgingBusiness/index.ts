import type {
	Boolean,
	DateTime,
	Number,
	Text,
	Time,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type Language from "../../../Intangible/Language/index.ts"
import type Rating from "../../../Intangible/Rating/index.ts"
import type LocationFeatureSpecification from "../../../Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

import AudienceComponent from "../../../../../components/Thing/Intangible/Audience/index.ts"
import LanguageComponent from "../../../../../components/Thing/Intangible/Language/index.ts"
import RatingComponent from "../../../../../components/Thing/Intangible/Rating/index.ts"
import LocationFeatureSpecificationComponent from "../../../../../components/Thing/Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface LodgingBusinessProps {
	"@type"?: "LodgingBusiness"
	amenityFeature?:
		| LocationFeatureSpecification
		| ReturnType<typeof LocationFeatureSpecificationComponent>
	audience?: Audience | ReturnType<typeof AudienceComponent>
	availableLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	checkinTime?: DateTime | Time
	checkoutTime?: DateTime | Time
	numberOfRooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	petsAllowed?: Boolean | Text
	starRating?: Rating | ReturnType<typeof RatingComponent>
}

type LodgingBusiness =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& LodgingBusinessProps

export default LodgingBusiness
