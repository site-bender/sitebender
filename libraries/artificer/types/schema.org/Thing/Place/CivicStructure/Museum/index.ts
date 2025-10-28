import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type MuseumType = "Museum"

export interface MuseumProps {
	"@type"?: MuseumType
}

type Museum = Thing & PlaceProps & CivicStructureProps & MuseumProps

export default Museum
