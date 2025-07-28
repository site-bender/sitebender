import type { Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ServiceProps } from "../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"

import FinancialProductComponent from "../../../../../../components/Thing/Intangible/Service/FinancialProduct/index.tsx"

export interface FinancialProductProps {
	annualPercentageRate?: Number | QuantitativeValue
	feesAndCommissionsSpecification?: Text | URL
	interestRate?: Number | QuantitativeValue
}

type FinancialProduct =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps

export default FinancialProduct
