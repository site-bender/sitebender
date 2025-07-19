import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RoleProps } from "../index.ts"

export interface OrganizationRoleProps {
	/** A number associated with a role in an organization, for example, the number on an athlete's jersey. */
	numberedPosition?: Number
}

type OrganizationRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& OrganizationRoleProps

export default OrganizationRole
