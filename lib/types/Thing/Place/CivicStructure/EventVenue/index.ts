import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import EventVenueComponent from "../../../../../../components/Thing/Place/CivicStructure/EventVenue/index.tsx"

export interface EventVenueProps {
}

type EventVenue =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& EventVenueProps

export default EventVenue
