import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type SportsTeam from "../../Organization/SportsOrganization/SportsTeam/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"

import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { SportsTeam as SportsTeamComponent } from "../../../../../components/index.tsx"

export type SportsEventType = "SportsEvent"

export interface SportsEventProps {
	"@type"?: SportsEventType
	awayTeam?:
		| Person
		| SportsTeam
		| ReturnType<typeof PersonComponent>
		| ReturnType<typeof SportsTeamComponent>
	competitor?:
		| Person
		| SportsTeam
		| ReturnType<typeof PersonComponent>
		| ReturnType<typeof SportsTeamComponent>
	homeTeam?:
		| Person
		| SportsTeam
		| ReturnType<typeof PersonComponent>
		| ReturnType<typeof SportsTeamComponent>
	referee?: Person | ReturnType<typeof PersonComponent>
	sport?: Text | URL
}

type SportsEvent = Thing & EventProps & SportsEventProps

export default SportsEvent
