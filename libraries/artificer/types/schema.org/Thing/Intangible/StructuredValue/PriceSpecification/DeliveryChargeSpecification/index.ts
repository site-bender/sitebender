import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type AdministrativeArea from "../../../../Place/AdministrativeArea/index.ts"
import type Place from "../../../../Place/index.ts"
import type DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type GeoShape from "../../GeoShape/index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"

import DeliveryMethodComponent from "../../../../../../../../architect/src/define/Thing/Intangible/Enumeration/DeliveryMethod/index.tsx"
import GeoShapeComponent from "../../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/GeoShape/index.tsx"
import AdministrativeAreaComponent from "../../../../../../../../architect/src/define/Thing/Place/AdministrativeArea/index.tsx"
import PlaceComponent from "../../../../../../../../architect/src/define/Thing/Place/index.tsx"

export type DeliveryChargeSpecificationType = "DeliveryChargeSpecification"

export interface DeliveryChargeSpecificationProps {
	"@type"?: DeliveryChargeSpecificationType
	appliesToDeliveryMethod?:
		| DeliveryMethod
		| ReturnType<typeof DeliveryMethodComponent>
	areaServed?:
		| AdministrativeArea
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	eligibleRegion?:
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	ineligibleRegion?:
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
}

type DeliveryChargeSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps
	& DeliveryChargeSpecificationProps

export default DeliveryChargeSpecification
