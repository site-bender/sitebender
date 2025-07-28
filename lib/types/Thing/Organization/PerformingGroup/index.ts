import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

import PerformingGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/index.tsx"

export interface PerformingGroupProps {
}

type PerformingGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps

export default PerformingGroup
