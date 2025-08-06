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
import type { BedAndBreakfastType } from "./BedAndBreakfast/index.ts"
import type { CampgroundType } from "./Campground/index.ts"
import type { HostelType } from "./Hostel/index.ts"
import type { HotelType } from "./Hotel/index.ts"
import type { MotelType } from "./Motel/index.ts"
import type { ResortType } from "./Resort/index.ts"
import type { VacationRentalType } from "./VacationRental/index.ts"

import { Audience as AudienceComponent } from "../../../../../../components/index.tsx"
import { Language as LanguageComponent } from "../../../../../../components/index.tsx"
import { Rating as RatingComponent } from "../../../../../../components/index.tsx"
import { LocationFeatureSpecification as LocationFeatureSpecificationComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type LodgingBusinessType =
	| "LodgingBusiness"
	| MotelType
	| ResortType
	| CampgroundType
	| HotelType
	| HostelType
	| VacationRentalType
	| BedAndBreakfastType

export interface LodgingBusinessProps {
	"@type"?: LodgingBusinessType
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
