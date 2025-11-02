import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"
import type { DanceGroupType } from "./DanceGroup/index.ts"
import type { MusicGroupType } from "./MusicGroup/index.ts"
import type { TheaterGroupType } from "./TheaterGroup/index.ts"

export type PerformingGroupType =
	| "PerformingGroup"
	| DanceGroupType
	| TheaterGroupType
	| MusicGroupType

export interface PerformingGroupProps {
	"@type"?: PerformingGroupType
}

type PerformingGroup = Thing & OrganizationProps & PerformingGroupProps

export default PerformingGroup
