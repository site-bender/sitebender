import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type AdministrativeArea from "../../../../Place/AdministrativeArea/index.ts"
import type Place from "../../../../Place/index.ts"
import type DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type GeoShape from "../../GeoShape/index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"

import DeliveryMethodComponent from "../../../../../../components/Thing/Intangible/Enumeration/DeliveryMethod/index.ts"
import GeoShapeComponent from "../../../../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import AdministrativeAreaComponent from "../../../../../../components/Thing/Place/AdministrativeArea/index.ts"
import PlaceComponent from "../../../../../../components/Thing/Place/index.ts"

export interface DeliveryChargeSpecificationProps {
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
