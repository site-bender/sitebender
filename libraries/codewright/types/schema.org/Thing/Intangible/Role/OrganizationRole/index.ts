import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RoleProps } from "../index.ts"
import type { EmployeeRoleType } from "./EmployeeRole/index.ts"

export type OrganizationRoleType = "OrganizationRole" | EmployeeRoleType

export interface OrganizationRoleProps {
	"@type"?: OrganizationRoleType
	numberedPosition?: Number
}

type OrganizationRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& OrganizationRoleProps

export default OrganizationRole
