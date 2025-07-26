import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"

export interface TheaterGroupProps {
}

type TheaterGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& TheaterGroupProps

export default TheaterGroup
