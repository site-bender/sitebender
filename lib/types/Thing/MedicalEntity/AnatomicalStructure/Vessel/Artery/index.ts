import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type { VesselProps } from "../index.ts"
import type AnatomicalStructure from "../../index.ts"

import ArteryComponent from "../../../../../../../components/Thing/MedicalEntity/AnatomicalStructure/Vessel/Artery/index.tsx"

export interface ArteryProps {
	arterialBranch?: AnatomicalStructure
	supplyTo?: AnatomicalStructure
}

type Artery =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps
	& ArteryProps

export default Artery
