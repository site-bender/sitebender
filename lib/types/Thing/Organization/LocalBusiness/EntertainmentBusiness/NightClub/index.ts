// NightClub extends EntertainmentBusiness but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { EntertainmentBusinessProps } from "../../../../Place/LocalBusiness/EntertainmentBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface NightClubProps {}

type NightClub =
	& Thing
	& EntertainmentBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& NightClubProps

export default NightClub
