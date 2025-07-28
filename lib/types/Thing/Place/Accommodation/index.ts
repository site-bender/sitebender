import type {
	Boolean,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"
import type BedDetails from "../../Intangible/BedDetails/index.ts"
import type BedType from "../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type FloorPlan from "../../Intangible/FloorPlan/index.ts"
import type LocationFeatureSpecification from "../../Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import AccommodationComponent from "../../../../../components/Thing/Place/Accommodation/index.tsx"

export interface AccommodationProps {
	accommodationCategory?: Text
	accommodationFloorPlan?: FloorPlan
	amenityFeature?: LocationFeatureSpecification
	bed?: BedDetails | BedType | Text
	floorLevel?: Text
	floorSize?: QuantitativeValue
	leaseLength?: Duration | QuantitativeValue
	numberOfBathroomsTotal?: Integer
	numberOfBedrooms?: Number | QuantitativeValue
	numberOfFullBathrooms?: Number
	numberOfPartialBathrooms?: Number
	numberOfRooms?: Number | QuantitativeValue
	occupancy?: QuantitativeValue
	permittedUsage?: Text
	petsAllowed?: Boolean | Text
	tourBookingPage?: URL
	yearBuilt?: Number
}

type Accommodation =
	& Thing
	& PlaceProps
	& AccommodationProps

export default Accommodation
