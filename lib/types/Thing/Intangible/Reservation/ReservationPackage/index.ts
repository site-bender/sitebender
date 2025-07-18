import type Reservation from "../index.ts"

export default interface ReservationPackage extends Reservation {
	/** The individual reservations included in the package. Typically a repeated property. */
	subReservation?: Reservation
}
