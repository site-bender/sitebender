import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type FulfillmentTypeEnumeration from "../../Enumeration/FulfillmentTypeEnumeration/index.ts"
import type MemberProgramTier from "../../MemberProgramTier/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type ServicePeriod from "../ServicePeriod/index.ts"
import type ShippingConditions from "../ShippingConditions/index.ts"

import ShippingServiceComponent from "../../../../../../components/Thing/Intangible/StructuredValue/ShippingService/index.tsx"

export interface ShippingServiceProps {
	fulfillmentType?: FulfillmentTypeEnumeration
	handlingTime?: QuantitativeValue | ServicePeriod
	shippingConditions?: ShippingConditions
	validForMemberTier?: MemberProgramTier
}

type ShippingService =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& ShippingServiceProps

export default ShippingService
