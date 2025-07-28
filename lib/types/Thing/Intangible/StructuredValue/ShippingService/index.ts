import type Thing from "../../../index.ts"
import type FulfillmentTypeEnumeration from "../../Enumeration/FulfillmentTypeEnumeration/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"
import type ShippingConditions from "../ShippingConditions/index.ts"

import FulfillmentTypeEnumerationComponent from "../../../../../components/Thing/Intangible/Enumeration/FulfillmentTypeEnumeration/index.ts"
import MemberProgramTierComponent from "../../../../../components/Thing/Intangible/MemberProgramTier/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import ServicePeriodComponent from "../../../../../components/Thing/Intangible/StructuredValue/ServicePeriod/index.ts"
import ShippingConditionsComponent from "../../../../../components/Thing/Intangible/StructuredValue/ShippingConditions/index.ts"

export interface ShippingServiceProps {
	fulfillmentType?:
		| FulfillmentTypeEnumeration
		| ReturnType<typeof FulfillmentTypeEnumerationComponent>
	handlingTime?:
		| QuantitativeValue
		| ServicePeriod
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof ServicePeriodComponent>
	shippingConditions?:
		| ShippingConditions
		| ReturnType<typeof ShippingConditionsComponent>
	validForMemberTier?:
		| MemberProgramTier
		| ReturnType<typeof MemberProgramTierComponent>
}

type ShippingService =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingServiceProps

export default ShippingService
