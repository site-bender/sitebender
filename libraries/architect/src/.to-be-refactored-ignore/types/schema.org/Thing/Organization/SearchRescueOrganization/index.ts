import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type SearchRescueOrganizationType = "SearchRescueOrganization"

export interface SearchRescueOrganizationProps {
	"@type"?: SearchRescueOrganizationType
}

type SearchRescueOrganization =
	& Thing
	& OrganizationProps
	& SearchRescueOrganizationProps

export default SearchRescueOrganization
