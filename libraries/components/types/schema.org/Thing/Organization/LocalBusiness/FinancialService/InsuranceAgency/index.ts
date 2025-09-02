import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FinancialServiceProps } from "../index.ts"

export type InsuranceAgencyType = "InsuranceAgency"

export interface InsuranceAgencyProps {
	"@type"?: InsuranceAgencyType
}

type InsuranceAgency =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FinancialServiceProps
	& OrganizationProps
	& InsuranceAgencyProps

export default InsuranceAgency
