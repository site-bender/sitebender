import type { Text } from "../../../../DataType/index.ts"
import type Audience from "../../Audience/index.ts"
import type Trip from "../index.ts"

export default interface TouristTrip extends Trip {
	/** Attraction suitable for type(s) of tourist. E.g. children, visitors from a particular country, etc. */
	touristType?: Audience | Text
}
