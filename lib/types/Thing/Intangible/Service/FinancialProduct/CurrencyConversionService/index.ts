// CurrencyConversionService extends FinancialProduct but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { ServiceProps } from "../../index.ts"
import type { FinancialProductProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CurrencyConversionServiceProps {}

type CurrencyConversionService =
	& Thing
	& FinancialProductProps
	& IntangibleProps
	& ServiceProps
	& CurrencyConversionServiceProps

export default CurrencyConversionService
