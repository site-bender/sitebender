// ExerciseGym extends SportsActivityLocation but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { SportsActivityLocationProps } from "../../../../Place/LocalBusiness/SportsActivityLocation/index.ts"

// deno-lint-ignore no-empty-interface
export interface ExerciseGymProps {}

type ExerciseGym =
	& Thing
	& LocalBusinessProps
	& PlaceProps
	& SportsActivityLocationProps
	& ExerciseGymProps

export default ExerciseGym
