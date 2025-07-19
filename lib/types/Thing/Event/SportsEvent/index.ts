import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type SportsTeam from "../../Organization/SportsOrganization/SportsTeam/index.ts"
import type Person from "../../Person/index.ts"
import type { EventProps } from "../index.ts"

export interface SportsEventProps {
	/** The away team in a sports event. */
	awayTeam?: Person | SportsTeam
	/** A competitor in a sports event. */
	competitor?: Person | SportsTeam
	/** The home team in a sports event. */
	homeTeam?: Person | SportsTeam
	/** An official who watches a game or match closely to enforce the rules and arbitrate on matters arising from the play such as referees, umpires or judges. The name of the effective function can vary according to the sport. */
	referee?: Person
	/** A type of sport (e.g. Baseball). */
	sport?: URL | Text
}

type SportsEvent =
	& Thing
	& EventProps
	& SportsEventProps

export default SportsEvent
