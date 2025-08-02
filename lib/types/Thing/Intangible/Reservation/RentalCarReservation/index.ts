import type { DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Place from "../../../Place/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ReservationProps } from "../index.ts"

import PlaceComponent from "../../../../../components/Thing/Place/index.ts"

export type RentalCarReservationType = "RentalCarReservation"

export interface RentalCarReservationProps {
	"@type"?: RentalCarReservationType
	dropoffLocation?: Place | ReturnType<typeof PlaceComponent>
	dropoffTime?: DateTime
	pickupLocation?: Place | ReturnType<typeof PlaceComponent>
	pickupTime?: DateTime
}

type RentalCarReservation =
	& Thing
	& IntangibleProps
	& ReservationProps
	& RentalCarReservationProps

export default RentalCarReservation
