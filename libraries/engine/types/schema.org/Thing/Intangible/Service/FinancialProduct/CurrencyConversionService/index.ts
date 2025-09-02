import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"

export type CurrencyConversionServiceType = "CurrencyConversionService"

export interface CurrencyConversionServiceProps {
	"@type"?: CurrencyConversionServiceType
}

type CurrencyConversionService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& FinancialProductProps
	& CurrencyConversionServiceProps

export default CurrencyConversionService
