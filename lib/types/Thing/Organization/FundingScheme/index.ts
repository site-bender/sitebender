import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import FundingSchemeComponent from "../../../../../components/Thing/Organization/FundingScheme/index.tsx"

export interface FundingSchemeProps {
}

type FundingScheme =
	& Thing
	& OrganizationProps
	& FundingSchemeProps

export default FundingScheme
