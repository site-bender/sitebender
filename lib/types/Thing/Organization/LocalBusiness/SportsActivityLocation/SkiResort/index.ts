// SkiResort extends SportsActivityLocation but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { LodgingBusinessProps } from "../../../../Place/LocalBusiness/LodgingBusiness/index.ts"
import type { ResortProps } from "../../../../Place/LocalBusiness/LodgingBusiness/Resort/index.ts"

// deno-lint-ignore no-empty-interface
export interface SkiResortProps {}

type SkiResort =
	& Thing
	& LocalBusinessProps
	& LodgingBusinessProps
	& PlaceProps
	& ResortProps
	& SkiResortProps

export default SkiResort
