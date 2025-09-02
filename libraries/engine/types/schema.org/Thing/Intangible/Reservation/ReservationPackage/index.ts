import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Reservation from "../index.ts"
import type { ReservationProps } from "../index.ts"

import { Reservation as ReservationComponent } from "../../../../../../components/index.tsx"

export type ReservationPackageType = "ReservationPackage"

export interface ReservationPackageProps {
	"@type"?: ReservationPackageType
	subReservation?: Reservation | ReturnType<typeof ReservationComponent>
}

type ReservationPackage =
	& Thing
	& IntangibleProps
	& ReservationProps
	& ReservationPackageProps

export default ReservationPackage
