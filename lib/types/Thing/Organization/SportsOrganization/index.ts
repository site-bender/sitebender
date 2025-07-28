import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface SportsOrganizationProps {
	sport?: Text | URL
}

type SportsOrganization = Thing & OrganizationProps & SportsOrganizationProps

export default SportsOrganization
