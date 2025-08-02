import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { AudienceProps } from "../index.ts"

import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export type BusinessAudienceType = "BusinessAudience"

export interface BusinessAudienceProps {
	"@type"?: BusinessAudienceType
	numberOfEmployees?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	yearlyRevenue?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	yearsInOperation?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type BusinessAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& BusinessAudienceProps

export default BusinessAudience
