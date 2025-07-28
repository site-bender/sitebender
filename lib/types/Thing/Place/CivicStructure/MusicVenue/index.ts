import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import MusicVenueComponent from "../../../../../../components/Thing/Place/CivicStructure/MusicVenue/index.tsx"

export interface MusicVenueProps {
}

type MusicVenue =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& MusicVenueProps

export default MusicVenue
