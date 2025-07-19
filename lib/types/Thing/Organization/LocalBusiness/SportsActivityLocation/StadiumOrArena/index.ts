// StadiumOrArena extends SportsActivityLocation but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { SportsActivityLocationProps } from "../../../../Place/LocalBusiness/SportsActivityLocation/index.ts"

// deno-lint-ignore no-empty-interface
export interface StadiumOrArenaProps {}

type StadiumOrArena =
	& Thing
	& LocalBusinessProps
	& PlaceProps
	& SportsActivityLocationProps
	& StadiumOrArenaProps

export default StadiumOrArena
