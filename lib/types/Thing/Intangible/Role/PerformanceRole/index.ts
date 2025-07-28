import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RoleProps } from "../index.ts"

import PerformanceRoleComponent from "../../../../../../components/Thing/Intangible/Role/PerformanceRole/index.tsx"

export interface PerformanceRoleProps {
	characterName?: Text
}

type PerformanceRole =
	& Thing
	& IntangibleProps
	& RoleProps
	& PerformanceRoleProps

export default PerformanceRole
