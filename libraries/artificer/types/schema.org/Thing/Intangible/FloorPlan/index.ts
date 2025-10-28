import type {
	Boolean,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Thing from "../../index.ts"
import type Accommodation from "../../Place/Accommodation/index.ts"
import type { IntangibleProps } from "../index.ts"
import type LocationFeatureSpecification from "../StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import ImageObjectComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import LocationFeatureSpecificationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.tsx"
import QuantitativeValueComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import AccommodationComponent from "../../../../../../pagewright/src/define/Thing/Place/Accommodation/index.tsx"

export type FloorPlanType = "FloorPlan"

export interface FloorPlanProps {
	"@type"?: FloorPlanType
	amenityFeature?:
		| LocationFeatureSpecification
		| ReturnType<typeof LocationFeatureSpecificationComponent>
	floorSize?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	isPlanForApartment?:
		| Accommodation
		| ReturnType<typeof AccommodationComponent>
	layoutImage?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	numberOfAccommodationUnits?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfAvailableAccommodationUnits?:
		| QuantitativeValue
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
	petsAllowed?: Boolean | Text
}

type FloorPlan = Thing & IntangibleProps & FloorPlanProps

export default FloorPlan
