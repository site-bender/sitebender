import type { DateTime, Text } from "../../../../DataType/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type Airport from "../../../Place/CivicStructure/Airport/index.ts"
import type Vehicle from "../../../Product/Vehicle/index.ts"
import type BoardingPolicyType from "../../Enumeration/BoardingPolicyType/index.ts"
import type Distance from "../../Quantity/Distance/index.ts"
import type Duration from "../../Quantity/Duration/index.ts"
import type Trip from "../index.ts"

export default interface Flight extends Trip {
	/** The kind of aircraft (e.g., "Boeing 747"). */
	aircraft?: Vehicle | Text
	/** The airport where the flight terminates. */
	arrivalAirport?: Airport
	/** Identifier of the flight's arrival gate. */
	arrivalGate?: Text
	/** Identifier of the flight's arrival terminal. */
	arrivalTerminal?: Text
	/** The type of boarding policy used by the airline (e.g. zone-based or group-based). */
	boardingPolicy?: BoardingPolicyType
	/** 'carrier' is an out-dated term indicating the 'provider' for parcel delivery and flights. */
	carrier?: Organization
	/** The airport where the flight originates. */
	departureAirport?: Airport
	/** Identifier of the flight's departure gate. */
	departureGate?: Text
	/** Identifier of the flight's departure terminal. */
	departureTerminal?: Text
	/** The estimated time the flight will take. */
	estimatedFlightDuration?: Text | Duration
	/** The distance of the flight. */
	flightDistance?: Text | Distance
	/** The unique identifier for a flight including the airline IATA code. For example, if describing United flight 110, where the IATA code for United is 'UA', the flightNumber is 'UA110'. */
	flightNumber?: Text
	/** Description of the meals that will be provided or available for purchase. */
	mealService?: Text
	/** An entity which offers (sells / leases / lends / loans) the services / goods.  A seller may also be a provider. */
	seller?: Organization | Person
	/** The time when a passenger can check into the flight online. */
	webCheckinTime?: DateTime
}
