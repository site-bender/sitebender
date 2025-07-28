import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"

import DanceGroupComponent from "../../../../../../components/Thing/Organization/PerformingGroup/DanceGroup/index.tsx"

export interface DanceGroupProps {
}

type DanceGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& DanceGroupProps

export default DanceGroup
