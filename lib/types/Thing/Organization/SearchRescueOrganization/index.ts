import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface SearchRescueOrganizationProps {
	"@type"?: "SearchRescueOrganization"}

type SearchRescueOrganization =
	& Thing
	& OrganizationProps
	& SearchRescueOrganizationProps

export default SearchRescueOrganization
