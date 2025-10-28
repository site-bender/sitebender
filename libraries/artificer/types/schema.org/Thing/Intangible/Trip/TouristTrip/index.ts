import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Audience from "../../Audience/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { TripProps } from "../index.ts"

import AudienceComponent from "../../../../../../../architect/src/define/Thing/Intangible/Audience/index.tsx"

export type TouristTripType = "TouristTrip"

export interface TouristTripProps {
	"@type"?: TouristTripType
	touristType?: Audience | Text | ReturnType<typeof AudienceComponent>
}

type TouristTrip = Thing & IntangibleProps & TripProps & TouristTripProps

export default TouristTrip
