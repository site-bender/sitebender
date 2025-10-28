import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type AnatomicalStructure from "../../index.ts"
import type { AnatomicalStructureProps } from "../../index.ts"
import type { VesselProps } from "../index.ts"

import AnatomicalStructureComponent from "../../../../../../../../architect/src/define/Thing/MedicalEntity/AnatomicalStructure/index.tsx"

export type ArteryType = "Artery"

export interface ArteryProps {
	"@type"?: ArteryType
	arterialBranch?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
	supplyTo?:
		| AnatomicalStructure
		| ReturnType<typeof AnatomicalStructureComponent>
}

type Artery =
	& Thing
	& MedicalEntityProps
	& AnatomicalStructureProps
	& VesselProps
	& ArteryProps

export default Artery
