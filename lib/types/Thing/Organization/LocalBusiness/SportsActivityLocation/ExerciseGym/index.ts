import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import ExerciseGymComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/SportsActivityLocation/ExerciseGym/index.tsx"

export interface ExerciseGymProps {
}

type ExerciseGym =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& ExerciseGymProps

export default ExerciseGym
