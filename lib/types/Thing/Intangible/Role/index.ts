import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface RoleProps {
	endDate?: Date | DateTime
	namedPosition?: Text | URL
	roleName?: Text | URL
	startDate?: Date | DateTime
}

type Role = Thing & IntangibleProps & RoleProps

export default Role
