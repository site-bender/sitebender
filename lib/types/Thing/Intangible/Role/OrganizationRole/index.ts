import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RoleProps } from "../index.ts"

import OrganizationRoleComponent from "../../../../../../components/Thing/Intangible/Role/OrganizationRole/index.tsx"

export interface OrganizationRoleProps {
	numberedPosition?: Number
}

type OrganizationRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& OrganizationRoleProps

export default OrganizationRole
