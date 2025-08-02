import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type MusicVenueType = "MusicVenue"

export interface MusicVenueProps {
	"@type"?: MusicVenueType
}

type MusicVenue = Thing & PlaceProps & CivicStructureProps & MusicVenueProps

export default MusicVenue
