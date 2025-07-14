import { Text } from "../../../../DataType/index.ts"
import SportsEvent from "../../../Event/SportsEvent/index.ts"
import Distance from "../../../Intangible/Quantity/Distance/index.ts"
import Diet from "../../../MedicalEntity/LifestyleModification/Diet/index.ts"
import ExercisePlan from "../../../MedicalEntity/LifestyleModification/PhysicalActivity/ExercisePlan/index.ts"
import SportsActivityLocation from "../../../Organization/LocalBusiness/SportsActivityLocation/index.ts"
import SportsTeam from "../../../Organization/SportsOrganization/SportsTeam/index.ts"
import Person from "../../../Person/index.ts"
import Place from "../../../Place/index.ts"
import PlayAction from "../index.ts"

export default interface ExerciseAction extends PlayAction {
	/** A sub property of location. The course where this action was taken. */
	course?: Place
	/** A sub property of instrument. The diet used in this action. */
	diet?: Diet
	/** The distance travelled, e.g. exercising or travelling. */
	distance?: Distance
	/** A sub property of location. The course where this action was taken. */
	exerciseCourse?: Place
	/** A sub property of instrument. The exercise plan used on this action. */
	exercisePlan?: ExercisePlan
	/** A sub property of instrument. The diet used in this action. */
	exerciseRelatedDiet?: Diet
	/** Type(s) of exercise or activity, such as strength training, flexibility training, aerobics, cardiac rehabilitation, etc. */
	exerciseType?: Text
	/** A sub property of location. The original location of the object or the agent before the action. */
	fromLocation?: Place
	/** A sub property of participant. The opponent on this action. */
	opponent?: Person
	/** A sub property of location. The sports activity location where this action occurred. */
	sportsActivityLocation?: SportsActivityLocation
	/** A sub property of location. The sports event where this action occurred. */
	sportsEvent?: SportsEvent
	/** A sub property of participant. The sports team that participated on this action. */
	sportsTeam?: SportsTeam
	/** A sub property of location. The final location of the object or the agent after the action. */
	toLocation?: Place
}
