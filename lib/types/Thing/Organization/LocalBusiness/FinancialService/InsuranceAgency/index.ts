// InsuranceAgency extends FinancialService but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { FinancialServiceProps } from "../../../../Place/LocalBusiness/FinancialService/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface InsuranceAgencyProps {}

type InsuranceAgency =
	& Thing
	& FinancialServiceProps
	& LocalBusinessProps
	& PlaceProps
	& InsuranceAgencyProps

export default InsuranceAgency
