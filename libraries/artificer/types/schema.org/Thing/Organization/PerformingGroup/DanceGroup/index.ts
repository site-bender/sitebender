import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"

export type DanceGroupType = "DanceGroup"

export interface DanceGroupProps {
	"@type"?: DanceGroupType
}

type DanceGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& DanceGroupProps

export default DanceGroup
