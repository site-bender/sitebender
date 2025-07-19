import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type { VesselProps } from "../index.ts"

export interface ArteryProps {
	/** The branches that comprise the arterial structure. */
	arterialBranch?: AnatomicalStructure
	/** The area to which the artery supplies blood. */
	supplyTo?: AnatomicalStructure
}

type Artery =
	& Thing
	& AnatomicalStructureProps
	& MedicalEntityProps
	& VesselProps
	& ArteryProps

export default Artery
