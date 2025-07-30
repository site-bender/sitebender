import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RoleProps } from "../index.ts"

export interface PerformanceRoleProps {
	"@type"?: "PerformanceRole"
	characterName?: Text
}

type PerformanceRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& PerformanceRoleProps

export default PerformanceRole
