import type Thing from "../../../index.ts"
import type FulfillmentTypeEnumeration from "../../Enumeration/FulfillmentTypeEnumeration/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"
import type ShippingConditions from "../ShippingConditions/index.ts"

import FulfillmentTypeEnumerationComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/FulfillmentTypeEnumeration/index.tsx"
import MemberProgramTierComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/MemberProgramTier/index.tsx"
import QuantitativeValueComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import ServicePeriodComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/ServicePeriod/index.tsx"
import ShippingConditionsComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/ShippingConditions/index.tsx"

export type ShippingServiceType = "ShippingService"

export interface ShippingServiceProps {
	"@type"?: ShippingServiceType
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
