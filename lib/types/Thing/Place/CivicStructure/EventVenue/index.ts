import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type EventVenueType = "EventVenue"

export interface EventVenueProps {
	"@type"?: EventVenueType
}

type EventVenue = Thing & PlaceProps & CivicStructureProps & EventVenueProps

export default EventVenue
