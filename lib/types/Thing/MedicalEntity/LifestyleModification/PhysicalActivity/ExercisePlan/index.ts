import { Number, Text } from "../../../../../DataType/index.ts"
import Duration from "../../../../Intangible/Quantity/Duration/index.ts"
import Energy from "../../../../Intangible/Quantity/Energy/index.ts"
import QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import PhysicalActivity from "../index.ts"

export default interface ExercisePlan extends PhysicalActivity {
	/** Length of time to engage in the activity. */
	activityDuration?: QuantitativeValue | Duration
	/** How often one should engage in the activity. */
	activityFrequency?: QuantitativeValue | Text
	/** Any additional component of the exercise prescription that may need to be articulated to the patient. This may include the order of exercises, the number of repetitions of movement, quantitative distance, progressions over time, etc. */
	additionalVariable?: Text
	/** Type(s) of exercise or activity, such as strength training, flexibility training, aerobics, cardiac rehabilitation, etc. */
	exerciseType?: Text
	/** Quantitative measure gauging the degree of force involved in the exercise, for example, heartbeats per minute. May include the velocity of the movement. */
	intensity?: QuantitativeValue | Text
	/** Number of times one should repeat the activity. */
	repetitions?: QuantitativeValue | Number
	/** How often one should break from the activity. */
	restPeriods?: QuantitativeValue | Text
	/** Quantitative measure of the physiologic output of the exercise; also referred to as energy expenditure. */
	workload?: Energy | QuantitativeValue
}
