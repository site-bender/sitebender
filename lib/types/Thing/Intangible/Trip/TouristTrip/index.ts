import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"
import type Audience from "../../Audience/index.ts"

import TouristTripComponent from "../../../../../../components/Thing/Intangible/Trip/TouristTrip/index.tsx"

export interface TouristTripProps {
	touristType?: Audience | Text
}

type TouristTrip =
	& Thing
	& IntangibleProps
	& TripProps
	& TouristTripProps

export default TouristTrip
