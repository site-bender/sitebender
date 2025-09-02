import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type GenderType from "../../../Intangible/Enumeration/GenderType/index.ts"
import type Person from "../../../Person/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { SportsOrganizationProps } from "../index.ts"

import { GenderType as GenderTypeComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"

export type SportsTeamType = "SportsTeam"

export interface SportsTeamProps {
	"@type"?: SportsTeamType
	athlete?: Person | ReturnType<typeof PersonComponent>
	coach?: Person | ReturnType<typeof PersonComponent>
	gender?: GenderType | Text | ReturnType<typeof GenderTypeComponent>
}

type SportsTeam =
	& Thing
	& OrganizationProps
	& SportsOrganizationProps
	& SportsTeamProps

export default SportsTeam
