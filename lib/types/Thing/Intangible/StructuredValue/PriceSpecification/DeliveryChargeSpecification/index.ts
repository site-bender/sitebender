import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"
import type AdministrativeArea from "../../../../Place/AdministrativeArea/index.ts"
import type DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import type GeoShape from "../../GeoShape/index.ts"
import type Place from "../../../../Place/index.ts"

import DeliveryChargeSpecificationComponent from "../../../../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/DeliveryChargeSpecification/index.tsx"

export interface DeliveryChargeSpecificationProps {
	appliesToDeliveryMethod?: DeliveryMethod
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	eligibleRegion?: GeoShape | Place | Text
	ineligibleRegion?: GeoShape | Place | Text
}

type DeliveryChargeSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps
	& DeliveryChargeSpecificationProps

export default DeliveryChargeSpecification
