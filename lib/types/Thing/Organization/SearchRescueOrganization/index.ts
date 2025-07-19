// SearchRescueOrganization extends Organization but adds no additional properties
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface SearchRescueOrganizationProps {}

type SearchRescueOrganization =
	& Thing
	& OrganizationProps
	& SearchRescueOrganizationProps

export default SearchRescueOrganization
