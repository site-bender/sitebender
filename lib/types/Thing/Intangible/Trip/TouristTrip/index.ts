import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../Audience/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

import AudienceComponent from "../../../../../components/Thing/Intangible/Audience/index.ts"

export interface TouristTripProps {
	touristType?: Audience | Text | ReturnType<typeof AudienceComponent>
}

type TouristTrip = Thing & IntangibleProps & TripProps & TouristTripProps

export default TouristTrip
