import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"

export type TheaterGroupType = "TheaterGroup"

export interface TheaterGroupProps {
	"@type"?: TheaterGroupType
}

type TheaterGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& TheaterGroupProps

export default TheaterGroup
