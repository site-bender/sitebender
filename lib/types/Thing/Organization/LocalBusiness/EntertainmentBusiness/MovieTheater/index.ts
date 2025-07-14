import { Number } from "../../../../../DataType/index.ts"
import EntertainmentBusiness from "../index.ts"

export default interface MovieTheater extends EntertainmentBusiness {
	/** The number of screens in the movie theater. */
	screenCount?: Number
}
