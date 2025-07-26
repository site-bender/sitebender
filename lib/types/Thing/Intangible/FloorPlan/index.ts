import type {
	Boolean,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Accommodation from "../../Place/Accommodation/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type LocationFeatureSpecification from "../StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

export interface FloorPlanProps {
	amenityFeature?: LocationFeatureSpecification
	floorSize?: QuantitativeValue
	isPlanForApartment?: Accommodation
	layoutImage?: ImageObject | URL
	numberOfAccommodationUnits?: QuantitativeValue
	numberOfAvailableAccommodationUnits?: QuantitativeValue
	numberOfBathroomsTotal?: Integer
	numberOfBedrooms?: Number | QuantitativeValue
	numberOfFullBathrooms?: Number
	numberOfPartialBathrooms?: Number
	numberOfRooms?: Number | QuantitativeValue
	petsAllowed?: Boolean | Text
}

type FloorPlan =
	& Thing
	& IntangibleProps
	& FloorPlanProps

export default FloorPlan
