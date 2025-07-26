import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"

export interface PerformingGroupProps {
}

type PerformingGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps

export default PerformingGroup
