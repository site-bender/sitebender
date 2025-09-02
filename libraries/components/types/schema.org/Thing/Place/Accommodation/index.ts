import type {
	Boolean,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BedDetails from "../../Intangible/BedDetails/index.ts"
import type BedType from "../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type FloorPlan from "../../Intangible/FloorPlan/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type LocationFeatureSpecification from "../../Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../index.ts"
import type { ApartmentType } from "./Apartment/index.ts"
import type { CampingPitchType } from "./CampingPitch/index.ts"
import type { HouseType } from "./House/index.ts"
import type { RoomType } from "./Room/index.ts"
import type { SuiteType } from "./Suite/index.ts"

import { BedDetails as BedDetailsComponent } from "../../../../../components/index.tsx"
import { BedType as BedTypeComponent } from "../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { FloorPlan as FloorPlanComponent } from "../../../../../components/index.tsx"
import { LocationFeatureSpecification as LocationFeatureSpecificationComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

export type AccommodationType =
	| "Accommodation"
	| CampingPitchType
	| RoomType
	| HouseType
	| SuiteType
	| ApartmentType

export interface AccommodationProps {
	"@type"?: AccommodationType
	accommodationCategory?: Text
	accommodationFloorPlan?: FloorPlan | ReturnType<typeof FloorPlanComponent>
	amenityFeature?:
		| LocationFeatureSpecification
		| ReturnType<typeof LocationFeatureSpecificationComponent>
	bed?:
		| BedDetails
		| BedType
		| Text
		| ReturnType<typeof BedDetailsComponent>
		| ReturnType<typeof BedTypeComponent>
	floorLevel?: Text
	floorSize?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
	leaseLength?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfBathroomsTotal?: Integer
	numberOfBedrooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfFullBathrooms?: Number
	numberOfPartialBathrooms?: Number
	numberOfRooms?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	occupancy?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
	permittedUsage?: Text
	petsAllowed?: Boolean | Text
	tourBookingPage?: URL
	yearBuilt?: Number
}

type Accommodation = Thing & PlaceProps & AccommodationProps

export default Accommodation
