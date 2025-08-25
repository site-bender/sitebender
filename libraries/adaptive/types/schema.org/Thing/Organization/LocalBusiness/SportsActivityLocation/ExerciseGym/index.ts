import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"

export type ExerciseGymType = "ExerciseGym"

export interface ExerciseGymProps {
	"@type"?: ExerciseGymType
}

type ExerciseGym =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& ExerciseGymProps

export default ExerciseGym
