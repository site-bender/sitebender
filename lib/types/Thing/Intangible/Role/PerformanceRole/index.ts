import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Role from "../index.ts"
import type { RoleProps } from "../index.ts"

export interface PerformanceRoleProps {
	/** The name of a character played in some acting or performing role, i.e. in a PerformanceRole. */
	characterName?: Text
}

type PerformanceRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& PerformanceRoleProps

export default PerformanceRole
