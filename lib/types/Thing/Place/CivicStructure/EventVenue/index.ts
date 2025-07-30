import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface EventVenueProps {
	"@type"?: "EventVenue"}

type EventVenue = Thing & PlaceProps & CivicStructureProps & EventVenueProps

export default EventVenue
