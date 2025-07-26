import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface GovernmentOrganizationProps {
}

type GovernmentOrganization =
	& Thing
	& OrganizationProps
	& GovernmentOrganizationProps

export default GovernmentOrganization
