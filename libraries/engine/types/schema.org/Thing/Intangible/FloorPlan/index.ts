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

import { Accommodation as AccommodationComponent } from "../../../../../components/index.tsx"
import { ImageObject as ImageObjectComponent } from "../../../../../components/index.tsx"
import { LocationFeatureSpecification as LocationFeatureSpecificationComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

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
