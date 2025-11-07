import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { AnatomicalStructureProps } from "../index.ts"
import type { ArteryType } from "./Artery/index.ts"
import type { LymphaticVesselType } from "./LymphaticVessel/index.ts"
import type { VeinType } from "./Vein/index.ts"

export type VesselType = "Vessel" | LymphaticVesselType | ArteryType | VeinType

export interface VesselProps {
	"@type"?: VesselType
}

type Vessel =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps

export default Vessel
