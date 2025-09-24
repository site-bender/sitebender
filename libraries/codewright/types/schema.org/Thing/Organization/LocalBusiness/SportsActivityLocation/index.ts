import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { BowlingAlleyType } from "./BowlingAlley/index.ts"
import type { ExerciseGymType } from "./ExerciseGym/index.ts"
import type { GolfCourseType } from "./GolfCourse/index.ts"
import type { HealthClubType } from "./HealthClub/index.ts"
import type { PublicSwimmingPoolType } from "./PublicSwimmingPool/index.ts"
import type { SkiResortType } from "./SkiResort/index.ts"
import type { SportsClubType } from "./SportsClub/index.ts"
import type { StadiumOrArenaType } from "./StadiumOrArena/index.ts"
import type { TennisComplexType } from "./TennisComplex/index.ts"

export type SportsActivityLocationType =
	| "SportsActivityLocation"
	| SportsClubType
	| GolfCourseType
	| ExerciseGymType
	| HealthClubType
	| PublicSwimmingPoolType
	| BowlingAlleyType
	| SkiResortType
	| StadiumOrArenaType
	| TennisComplexType

export interface SportsActivityLocationProps {
	"@type"?: SportsActivityLocationType
}

type SportsActivityLocation =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& SportsActivityLocationProps

export default SportsActivityLocation
