// FundingScheme extends Organization but adds no additional properties
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface FundingSchemeProps {}

type FundingScheme =
	& Thing
	& OrganizationProps
	& FundingSchemeProps

export default FundingScheme
