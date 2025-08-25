import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type FundingSchemeType = "FundingScheme"

export interface FundingSchemeProps {
	"@type"?: FundingSchemeType
}

type FundingScheme = Thing & OrganizationProps & FundingSchemeProps

export default FundingScheme
