import type { Text } from "../../../../DataType/index.ts"
import type Diet from "../../../CreativeWork/Diet/index.ts"
import type ExercisePlan from "../../../CreativeWork/ExercisePlan/index.ts"
import type SportsEvent from "../../../Event/SportsEvent/index.ts"
import type Thing from "../../../index.ts"
import type Distance from "../../../Intangible/Quantity/Distance/index.ts"
import type SportsActivityLocation from "../../../Organization/LocalBusiness/SportsActivityLocation/index.ts"
import type SportsTeam from "../../../Organization/SportsOrganization/SportsTeam/index.ts"
import type Person from "../../../Person/index.ts"
import type Place from "../../../Place/index.ts"
import type { ActionProps } from "../../index.ts"
import type { PlayActionProps } from "../index.ts"

import DietComponent from "../../../../../../src/define/Thing/CreativeWork/Diet/index.tsx"
import ExercisePlanComponent from "../../../../../../src/define/Thing/CreativeWork/ExercisePlan/index.tsx"
import SportsEventComponent from "../../../../../../src/define/Thing/Event/SportsEvent/index.tsx"
import DistanceComponent from "../../../../../../src/define/Thing/Intangible/Quantity/Distance/index.tsx"
import SportsActivityLocationComponent from "../../../../../../src/define/Thing/Organization/LocalBusiness/SportsActivityLocation/index.tsx"
import SportsTeamComponent from "../../../../../../src/define/Thing/Organization/SportsOrganization/SportsTeam/index.tsx"
import PersonComponent from "../../../../../../src/define/Thing/Person/index.tsx"
import PlaceComponent from "../../../../../../src/define/Thing/Place/index.tsx"

export type ExerciseActionType = "ExerciseAction"

export interface ExerciseActionProps {
	"@type"?: ExerciseActionType
	course?: Place | ReturnType<typeof PlaceComponent>
	diet?: Diet | ReturnType<typeof DietComponent>
	distance?: Distance | ReturnType<typeof DistanceComponent>
	exerciseCourse?: Place | ReturnType<typeof PlaceComponent>
	exercisePlan?: ExercisePlan | ReturnType<typeof ExercisePlanComponent>
	exerciseRelatedDiet?: Diet | ReturnType<typeof DietComponent>
	exerciseType?: Text
	fromLocation?: Place | ReturnType<typeof PlaceComponent>
	opponent?: Person | ReturnType<typeof PersonComponent>
	sportsActivityLocation?:
		| SportsActivityLocation
		| ReturnType<typeof SportsActivityLocationComponent>
	sportsEvent?: SportsEvent | ReturnType<typeof SportsEventComponent>
	sportsTeam?: SportsTeam | ReturnType<typeof SportsTeamComponent>
	toLocation?: Place | ReturnType<typeof PlaceComponent>
}

type ExerciseAction =
	& Thing
	& ActionProps
	& PlayActionProps
	& ExerciseActionProps

export default ExerciseAction
