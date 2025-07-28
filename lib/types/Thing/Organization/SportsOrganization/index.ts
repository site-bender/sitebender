import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import SportsOrganizationComponent from "../../../../../components/Thing/Organization/SportsOrganization/index.tsx"

export interface SportsOrganizationProps {
	sport?: Text | URL
}

type SportsOrganization =
	& Thing
	& OrganizationProps
	& SportsOrganizationProps

export default SportsOrganization
