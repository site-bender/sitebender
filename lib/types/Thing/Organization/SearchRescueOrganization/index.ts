import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import SearchRescueOrganizationComponent from "../../../../../components/Thing/Organization/SearchRescueOrganization/index.tsx"

export interface SearchRescueOrganizationProps {
}

type SearchRescueOrganization =
	& Thing
	& OrganizationProps
	& SearchRescueOrganizationProps

export default SearchRescueOrganization
