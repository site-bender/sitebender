import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { ProjectProps } from "../index.ts"

import FundingAgencyComponent from "../../../../../../components/Thing/Organization/Project/FundingAgency/index.tsx"

export interface FundingAgencyProps {
}

type FundingAgency =
	& Thing
	& OrganizationProps
	& ProjectProps
	& FundingAgencyProps

export default FundingAgency
