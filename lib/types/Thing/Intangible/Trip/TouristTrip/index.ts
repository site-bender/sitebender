import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../Audience/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

export interface TouristTripProps {
	/** Attraction suitable for type(s) of tourist. E.g. children, visitors from a particular country, etc. */
	touristType?: Audience | Text
}

type TouristTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& TouristTripProps

export default TouristTrip
