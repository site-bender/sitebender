import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { PlayActionProps } from "../index.ts"
import type Diet from "../../../CreativeWork/Diet/index.ts"
import type Distance from "../../../Intangible/Quantity/Distance/index.ts"
import type ExercisePlan from "../../../CreativeWork/ExercisePlan/index.ts"
import type Person from "../../../Person/index.ts"
import type Place from "../../../Place/index.ts"
import type SportsActivityLocation from "../../../Organization/LocalBusiness/SportsActivityLocation/index.ts"
import type SportsEvent from "../../../Event/SportsEvent/index.ts"
import type SportsTeam from "../../../Organization/SportsOrganization/SportsTeam/index.ts"

export interface ExerciseActionProps {
	course?: Place
	diet?: Diet
	distance?: Distance
	exerciseCourse?: Place
	exercisePlan?: ExercisePlan
	exerciseRelatedDiet?: Diet
	exerciseType?: Text
	fromLocation?: Place
	opponent?: Person
	sportsActivityLocation?: SportsActivityLocation
	sportsEvent?: SportsEvent
	sportsTeam?: SportsTeam
	toLocation?: Place
}

type ExerciseAction =
	& Thing
	& ActionProps
	& PlayActionProps
	& ExerciseActionProps

export default ExerciseAction
