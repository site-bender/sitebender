// TheaterGroup extends PerformingGroup but adds no additional properties
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface TheaterGroupProps {}

type TheaterGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& TheaterGroupProps

export default TheaterGroup
