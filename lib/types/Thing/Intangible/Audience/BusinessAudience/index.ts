import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"

import BusinessAudienceComponent from "../../../../../../components/Thing/Intangible/Audience/BusinessAudience/index.tsx"

export interface BusinessAudienceProps {
	numberOfEmployees?: QuantitativeValue
	yearlyRevenue?: QuantitativeValue
	yearsInOperation?: QuantitativeValue
}

type BusinessAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& BusinessAudienceProps

export default BusinessAudience
