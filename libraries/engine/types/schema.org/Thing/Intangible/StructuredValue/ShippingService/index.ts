import type Thing from "../../../index.ts"
import type FulfillmentTypeEnumeration from "../../Enumeration/FulfillmentTypeEnumeration/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"
import type ShippingConditions from "../ShippingConditions/index.ts"

import { FulfillmentTypeEnumeration as FulfillmentTypeEnumerationComponent } from "../../../../../../components/index.tsx"
import { MemberProgramTier as MemberProgramTierComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"
import { ServicePeriod as ServicePeriodComponent } from "../../../../../../components/index.tsx"
import { ShippingConditions as ShippingConditionsComponent } from "../../../../../../components/index.tsx"

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
