import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"

import CurrencyConversionServiceComponent from "../../../../../../../components/Thing/Intangible/Service/FinancialProduct/CurrencyConversionService/index.tsx"

export interface CurrencyConversionServiceProps {
}

type CurrencyConversionService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& CurrencyConversionServiceProps

export default CurrencyConversionService
