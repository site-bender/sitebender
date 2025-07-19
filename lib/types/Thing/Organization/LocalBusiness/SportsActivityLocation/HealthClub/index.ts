// HealthClub extends SportsActivityLocation but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { HealthAndBeautyBusinessProps } from "../../../../Place/LocalBusiness/HealthAndBeautyBusiness/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"

// deno-lint-ignore no-empty-interface
export interface HealthClubProps {}

type HealthClub =
	& Thing
	& HealthAndBeautyBusinessProps
	& LocalBusinessProps
	& PlaceProps
	& HealthClubProps

export default HealthClub
