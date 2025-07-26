import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface FundingSchemeProps {
}

type FundingScheme =
	& Thing
	& OrganizationProps
	& FundingSchemeProps

export default FundingScheme
