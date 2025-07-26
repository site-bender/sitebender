import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { ProjectProps } from "../index.ts"

export interface FundingAgencyProps {
}

type FundingAgency =
	& Thing
	& OrganizationProps
	& ProjectProps
	& FundingAgencyProps

export default FundingAgency
