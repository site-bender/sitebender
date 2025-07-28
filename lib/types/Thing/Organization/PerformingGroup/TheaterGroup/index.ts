import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"

import TheaterGroupComponent from "../../../../../../components/Thing/Organization/PerformingGroup/TheaterGroup/index.tsx"

export interface TheaterGroupProps {
}

type TheaterGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& TheaterGroupProps

export default TheaterGroup
