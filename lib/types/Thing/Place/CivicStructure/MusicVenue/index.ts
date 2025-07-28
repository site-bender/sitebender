import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface MusicVenueProps {}

type MusicVenue = Thing & PlaceProps & CivicStructureProps & MusicVenueProps

export default MusicVenue
