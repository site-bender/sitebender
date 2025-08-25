import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type { LinkRoleType } from "./LinkRole/index.ts"
import type { OrganizationRoleType } from "./OrganizationRole/index.ts"
import type { PerformanceRoleType } from "./PerformanceRole/index.ts"

export type RoleType =
	| "Role"
	| LinkRoleType
	| OrganizationRoleType
	| PerformanceRoleType

export interface RoleProps {
	"@type"?: RoleType
	endDate?: Date | DateTime
	namedPosition?: Text | URL
	roleName?: Text | URL
	startDate?: Date | DateTime
}

type Role = Thing & IntangibleProps & RoleProps

export default Role
