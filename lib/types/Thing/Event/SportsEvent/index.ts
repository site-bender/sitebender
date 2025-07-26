import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"
import type Person from "../../Person/index.ts"
import type SportsTeam from "../../Organization/SportsOrganization/SportsTeam/index.ts"

export interface SportsEventProps {
	awayTeam?: Person | SportsTeam
	competitor?: Person | SportsTeam
	homeTeam?: Person | SportsTeam
	referee?: Person
	sport?: Text | URL
}

type SportsEvent =
	& Thing
	& EventProps
	& SportsEventProps

export default SportsEvent
