import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { ProjectProps } from "../index.ts"

export type FundingAgencyType = "FundingAgency"

export interface FundingAgencyProps {
	"@type"?: FundingAgencyType
}

type FundingAgency =
	& Thing
	& OrganizationProps
	& ProjectProps
	& FundingAgencyProps

export default FundingAgency
