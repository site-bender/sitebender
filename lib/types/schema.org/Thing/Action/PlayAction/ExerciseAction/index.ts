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

import { Diet as DietComponent } from "../../../../../../components/index.tsx"
import { ExercisePlan as ExercisePlanComponent } from "../../../../../../components/index.tsx"
import { SportsEvent as SportsEventComponent } from "../../../../../../components/index.tsx"
import { Distance as DistanceComponent } from "../../../../../../components/index.tsx"
import { SportsActivityLocation as SportsActivityLocationComponent } from "../../../../../../components/index.tsx"
import { SportsTeam as SportsTeamComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../../components/index.tsx"

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
