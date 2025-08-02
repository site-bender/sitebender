import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export type GovernmentOrganizationType = "GovernmentOrganization"

export interface GovernmentOrganizationProps {
	"@type"?: GovernmentOrganizationType
}

type GovernmentOrganization =
	& Thing
	& OrganizationProps
	& GovernmentOrganizationProps

export default GovernmentOrganization
